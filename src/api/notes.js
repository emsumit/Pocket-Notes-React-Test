import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL_GROUP;
// const backendUrl = `http://localhost:3000/api/v1/notes`;

export const getAllGroups = async () => {
  try {
    const response = await axios.get(`${backendUrl}/all-groups`);
    return response.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
};

export const deleteGroup = async (groupId) => {
  try {
    const response = await axios.delete(`${backendUrl}/delete/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting group:", error);
    throw error;
  }
};

export const createGroup = async (newGroup) => {
  try {
    const response = await axios.post(`${backendUrl}/create-group`, newGroup);
    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};
export const updateGroup = async (groupId, updatedGroup) => {
  try {
    const response = await axios.put(
      `${backendUrl}/update-notes/${groupId}`,
      updatedGroup
    );
    return response.data;
  } catch (error) {
    console.error("Error updating group:", error);
    throw error;
  }
};
