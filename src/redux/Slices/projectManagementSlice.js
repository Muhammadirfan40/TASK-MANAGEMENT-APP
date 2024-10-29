import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching projects
export const fetchProjects = createAsyncThunk(
    'projectmanagement/fetchProjects',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://task-manager.codionslab.com/api/v1/admin/project', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Using token from local storage
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An unexpected error occurred.");
        }
    }
);

// Async thunk for creating a new project
export const createProject = createAsyncThunk(
    'projectmanagement/createProject',
    async (projectData, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://task-manager.codionslab.com/api/v1/admin/project', projectData, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Using token from local storage
                    'Content-Type': 'application/json',
                },
            });
            return response.data; // Return the created project data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to create project.");
        }
    }
);

// Async thunk for updating a project
export const updateProject = createAsyncThunk(
    'projectmanagement/updateProject',
    async ({ projectId, projectData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`https://task-manager.codionslab.com/api/v1/admin/project/${projectId}`, projectData, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Using token from local storage
                    'Content-Type': 'application/json',
                },
            });
            return response.data; // Return the updated project data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update project.");
        }
    }
);

// Async thunk for deleting a project
export const deleteProject = createAsyncThunk(
    'projectmanagement/deleteProject',
    async (projectId, { rejectWithValue }) => {
        try {
            await axios.delete(`https://task-manager.codionslab.com/api/v1/admin/project/${projectId}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Using token from local storage
                },
            });
            return projectId; // Return the project ID to remove it from state
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete project.");
        }
    }
);

const projectManagementSlice = createSlice({
    name: 'projectmanagement',
    initialState: {
        projects: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload.data.data;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load projects.";
            })
            .addCase(createProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projects.push(action.payload); // Assuming the response contains the created project
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create project.";
            })
            .addCase(updateProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.projects.findIndex(project => project.id === action.payload.id);
                if (index !== -1) {
                    state.projects[index] = action.payload; // Update the project in the state
                }
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update project.";
            })
            .addCase(deleteProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.loading = false;
                // Remove the deleted project from the state
                state.projects = state.projects.filter(project => project.id !== action.payload);
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete project.";
            });
    },
});

export default projectManagementSlice.reducer;
