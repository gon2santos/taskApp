// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with 'http://127.0.0.1:5000'
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://127.0.0.1:5000',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    } 
  }), /*https://task-app-backend-sable.vercel.app*/
  tagTypes: ['Projects', 'Tasks'],
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getProjects: builder.mutation({
      query: (payload) => ({
        url: '/projects/all',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      /* providesTags: ['Projects'], */
    }),
    getTasksQueue: builder.mutation({
      query: (payload) => ({
        url: '/queue/',
        method: 'PUT',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      /* providesTags: ['Tasks'], */
    }),
    updateTasksQueue: builder.mutation({
      query: (payload) => ({
        url: '/queue/',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      /* providesTags: ['Tasks'], */
    }),
    checkTask: builder.mutation({
      query: (payload) => ({
        url: '/tasks/check/',
        method: 'DELETE',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      /* invalidatesTags: ['Projects','Tasks'], */
    }),
    createTask: builder.mutation({
      query: (payload) => ({
        url: '/tasks/create/',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      /* invalidatesTags: ['Projects','Tasks'], */
    }),
    createProject: builder.mutation({
      query: (payload) => ({
        url: '/projects/create/',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      /* invalidatesTags: ['Projects','Tasks'], */
    }),
    deleteProject: builder.mutation({
      query: (payload) => ({
        url: '/projects/delete/',
        method: 'DELETE',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      /* invalidatesTags: ['Projects','Tasks'], */
    }),
    renameProject: builder.mutation({
      query: (payload) => ({
        url: '/projects/rename/',
        method: 'PUT',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      /* invalidatesTags: ['Projects'], */
    }),
    setCurrProj: builder.mutation({
      query: (payload) => ({
        url: '/projects/current/',
        method: 'PUT',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      /* invalidatesTags: ['Projects' ,'Tasks' ], */
    }),
    createCurrProj: builder.mutation({
      query: (payload) => ({
        url: '/projects/current/',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      /* invalidatesTags: ['Projects' ,'Tasks' ], */
    }),
    renameTask: builder.mutation({
      query: (payload) => ({
        url: '/tasks/rename/',
        method: 'PUT',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      /* invalidatesTags: ['Projects' ,'Tasks' ], */
    }),
    deleteTask: builder.mutation({
      query: (payload) => ({
        url: '/tasks/delete/',
        method: 'DELETE',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      /* invalidatesTags: ['Projects' ,'Tasks' ], */
    }),
    loginUser: builder.mutation({
      query: (payload) => ({
        url: '/users/login/',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      /* invalidatesTags: ['Projects' ,'Tasks' ], */
    }),
    createUser: builder.mutation({
      query: (payload) => ({
        url: '/users/create/',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      /* invalidatesTags: ['Projects' ,'Tasks' ], */
    }),
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetProjectsMutation, useGetTasksQueueMutation, useCheckTaskMutation, useCreateTaskMutation, 
              useCreateProjectMutation, useDeleteProjectMutation, useRenameProjectMutation, useSetCurrProjMutation, 
              useRenameTaskMutation, useDeleteTaskMutation, useLoginUserMutation, useCreateUserMutation, 
              useCreateCurrProjMutation, useUpdateTasksQueueMutation } = apiSlice