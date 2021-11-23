import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const userByNetlifyIdQuery = `
  *[netlifyId == $id]{
    ...,
    classes[]{
      ...,
      content[]{
        _type != 'resource' => @,
        _type == 'resource' => @->{
          ...
        },
      },    
    },
    "registrations": *[_type == "addRegistrationForm" %26%26 references(^._id)] {
      ...,
      teacher->,
      classType->,
      language->,
      students[]{
        _type != 'reference' => @,
        _type == 'reference' => @-> {
          name,
        }
      },
      "classes": *[_type == "class" %26%26 references(^._id)] 
    }
  }
`

const userByIdQuery = `
*[_id == $id]{
  ...,
  classes[]{
    ...,
    content[]{
      _type != 'resource' => @,
      _type == 'resource' => @->{
        ...
      },
    },    
  },
}
`

const classTypesQuery = `
  *[_type == 'classType'] {
    ...,
    packages[]{
      _type != 'reference' => @,
      _type == 'reference => @->{
        ...,
      }
    }
  }
`

const languagesQuery = `
  *[_type == 'language'] {
    ...,
    "relatedClasses": *[_type == "classType" %26%26 references(^._id)] {
      ...,
      packages[]{
        _type != 'reference' => @,
        _type == 'reference' => @->{
          ...,
        }
      }
    }
  }
`

const userRegistrationsQuery = `
  *[_type == 'addRegistrationForm' %26%26 references($id)] {
    _type != 'reference' => @,
    _type == 'reference' => @->{
      ...,
    }
  }
`

export const sanityApi = createApi({
  reducerPath: 'sanityApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production` 
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query({ 
      query: (id) => `?query=${userByNetlifyIdQuery}&$id="${id}"`,
      transformResponse: (response) => response.result[0]
    }),
    getUserById: builder.query({ 
      query: (id) => `?query=${userByIdQuery}&$id="${id}"`,
      transformResponse: (response) => response.result[0]
    }),
    getUserRegistrations: builder.query({
      query: (id) => `?query=${userRegistrationsQuery}&$id="${id}"`,
      transformResponse: (response) => response.result
    }),
    getClassTypes: builder.query({
      query: () => `?query=${classTypesQuery}`,
      transformResponse: (response) => response.result
    }),
    getLanguages: builder.query({
      query: () => `?query=${languagesQuery}`,
      transformResponse: (response) => response.result
    }),
  }),
})

export const { 
  useGetCurrentUserQuery, 
  useGetUserByIdQuery, 
  useGetUserRegistrationsQuery, 
  useGetClassTypesQuery,
  useGetLanguagesQuery,
} = sanityApi
