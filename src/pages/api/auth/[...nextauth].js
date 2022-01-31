import { SESSION_USER_FIELDS, WEB_NAME } from 'common/constants/common.constant'
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

  providers: [
    Providers.Credentials({
      name: WEB_NAME,

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          const user = await fetchSignin(process.env.API_URL, credentials)
          console.log('-----------------------------------------------------------')
          // console.log('-- authorize --', { credentials, user })

          if (user.status) return user
        } catch (e) {
          console.log(e)
        }

        return null
      },
    }),
  ],

  callbacks: {
    jwt: async (token, user) => {
      // assign user (return from authorize) -> token
      // user obj will available only 1st time jwt callback is called
      // from the 2nd time, user will be undefined
      if (user) {
        const newUser = {
          access_token: user.access_token,
          user: {
            ...user.data
          }
        }

        return newUser
      }

      else {
        // console.log('-- jwt token --', { token })
        return token
      }
    },

    session: async (session, token) => {
      // assign token data to session
      // beacause session reset everytime useSession() is called
      const newSession = { expires: session.expires, ...token }
      // console.log('-- final session --', { session, token })

      return newSession
    },
  },
}

export default (req, res) => NextAuth(req, res, options)
