// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with 'http://127.0.0.1:5000'
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:5000' }),
  tagTypes: ['Projects', 'Tasks'],
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getProjects: builder.query({
      // The URL for the request is 'http://127.0.0.1:5000/projects/all'
      query: () => '/projects/all',
      providesTags: ['Projects']
    }),
    getTasksQueue: builder.query({
      // The URL for the request is 'http://127.0.0.1:5000/queue/'
      query: () => '/queue/',
      providesTags: ['Tasks']
    }),
    deleteTasks: builder.mutation({
      query: (payload) => ({
        url: '/tasks/check/',
        method: 'DELETE',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Projects','Tasks'],
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
      invalidatesTags: ['Projects','Tasks'],
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
      invalidatesTags: ['Projects','Tasks'],
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
      invalidatesTags: ['Projects','Tasks'],
    }),
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetProjectsQuery, useGetTasksQueueQuery, useDeleteTasksMutation, useCreateTaskMutation, useCreateProjectMutation, useDeleteProjectMutation } = apiSlice