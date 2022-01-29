import { tokenData } from 'common/constants/common.constant'
import fetchSignin from 'modules/auth/api/auth.api'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  theme: {
    colorScheme: 'light',
    brandColor: '#455a64',
    logo: '/logo.png',
  },

  session: {
    jwt: true,
  },

  jwt: {
    secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
  },

  // only true in development
  debug: true,

  pages: {
    newUser: '/settings',
  },

  providers: [
    Providers.Credentials({
      name: 'Theses Share',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Mật khẩu', type: 'password' },
      },

      async authorize(credentials) {
        try {
          const user = await fetchSignin(process.env.API_URL, credentials)
          // console.log('-- authorize --', { credentials, user })

          if (user.status) {
            return user
          } else {
            return null
          }
        } catch (e) {
          return null
        }
      },
    }),
  ],

  callbacks: {
    jwt: async (token, user) => {
      // console.log('-- jwt --', { token, user })

      // assign user (return from authorize) -> token
      // user obj will available only 1st time jwt callback is called
      // from the 2nd time, user will be undefined
      if (user) {
        token['access_token'] = user['access_token']
        token.user = {}
        tokenData.map(item => (token.user[item] = user.data[item]))
      }

      return Promise.resolve(token)
    },

    session: async (session, token) => {
      // console.log('-- session --', { session, token })

      // assign token data to session
      // beacause session reset everytime useSession() is called
      session['access_token'] = token['access_token']
      tokenData.map(item => (session.user[item] = token.user[item]))

      return Promise.resolve(session)
    },
  },
}

export default (req, res) => NextAuth(req, res, options)
