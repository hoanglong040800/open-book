import { WEB_NAME } from 'common/constants/common.constant'
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

  // only true in development
  debug: true,

  providers: [
    Providers.Credentials({
      name: WEB_NAME,

      credentials: {
        user_name: {
          label: 'Username',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          const data = await fetchSignin(credentials)
          return data
        } catch (e) {
          throw e
        }
      },
    }),
  ],

  callbacks: {
    jwt: async (token, data) => {
      // assign user (return from authorize) -> token
      // user obj will available only 1st time jwt callback is called
      // from the 2nd time, user will be undefined
      if (data) {
        return data
      } else {
        return token
      }
    },

    session: async (session, token) => {
      // assign token data to session
      // beacause session reset everytime useSession() is called
      // console.log('token', token.access_token)
      const newSession = { ...token, expires: session.expires }
      return newSession
    },
  },
}

export default (req, res) => NextAuth(req, res, options)
