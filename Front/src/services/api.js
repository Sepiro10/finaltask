import axios from 'axios';

const urlApi = "http://127.0.0.1:8000/usuarios/";
const urlApiTask = "http://127.0.0.1:8000/tareas/";
const urlApiBadge = "http://127.0.0.1:8000/insignias/";

// Crea una instancia de axios
const apiRefresh = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Reemplaza con tu URL base
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para manejar errores de autenticación
apiRefresh.interceptors.response.use(
    response => response,  // Si la respuesta es exitosa, simplemente la retorna
    async error => {
        const originalRequest = error.config;
        
        // Si el error es 401 (token expirado) y no estamos intentando refrescar ya
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Obtén el Refresh Token almacenado (puedes ajustarlo según dónde lo guardes)
            const refreshToken = localStorage.getItem('refresh');
            if (refreshToken) {
                try {
                    // Realiza la solicitud para refrescar el token
                    const { data } = await axios.post('/usuarios/token/refresh/', { refresh: refreshToken });
                    
                    // Guarda el nuevo Access Token
                    localStorage.setItem('token', data.access);

                    // Actualiza el header con el nuevo token y reintenta la solicitud original
                    originalRequest.headers['Authorization'] = `Bearer ${data.access}`;

                    return apiRefresh(originalRequest);  // Reintenta la solicitud original
                } catch (refreshError) {
                    console.error("No se pudo refrescar el token", refreshError);
                    // Aquí podrías redirigir al usuario al login si el refresh token también expira
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);  // Si no es error 401, simplemente rechaza
    }
);


const api = {
    // apis para Login y usuarios ----------------------------------------------------

    //api para logear
    login: (email, password) => {
        return axios.post(`${urlApi}token/`, {
            email,
            password
        });
    },

    //api para registrar el usuario
    register: (nombre, apellido, email, password, rol, token) => {
        return axios.post(`${urlApi}create/`, {
            nombre,
            apellido,
            email,
            password,
            rol
        }, {
            headers: {
                'Authorization': `Bearer ${token}` // Agregar el token en el encabezado
            }
        });
    },

    //api para listar usarios (empleados)
    userList: (token) => {
        return axios.get(`${urlApi}getList/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },

    //api para actualizar usuarios 
    userUpdate: (id, datosActualizados, token) => {
        return axios.patch(`${urlApi}UpdateModifyDestroy/${id}`, datosActualizados, {
            headers: {
                'Authorization': `Bearer ${token}` // Agregar el token en el encabezado
            }
        });
    },

    //Api para borrar usaurios 
    userDelete: (id, token) => {
        return axios.delete(`${urlApi}UpdateModifyDestroy/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Agregar el token en el encabezado
            }
        });
    },

    //api para listar usuarios (empleados y jefes)
    userListAll: (token) => {
        return axios.get(`${urlApiTask}userList/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },


    // apis para tareas ---------------------------------------------------------------------------------
    
    //Registro de tareas
    taskRegister: (title, description, priority, deadline, assigned_to, assigned_by, points, token) => {
        return axios.post(`${urlApiTask}create/`, {
            title,
            description,
            priority,
            deadline,
            assigned_to,
            assigned_by,
            points
        }, {
            headers: {
                'Authorization': `Bearer ${token}` // Agregar el token en el encabezado
            }
        });
    },

    //lista de tareas por usuario 
    taskList: (token) => {
        return axios.get(`${urlApiTask}taskList/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },

    //api para actualizar tareas
    taskUpdate: (id, datosActualizados, token) => {
        return axios.patch(`${urlApiTask}UpdateModifyDestroy/${id}`, datosActualizados, {
            headers: {
                'Authorization': `Bearer ${token}` // Agregar el token en el encabezado
            }
        });
    },

    //api para borrar tareas    
    taskDelete: (id, token) => {
        return axios.delete(`${urlApiTask}UpdateModifyDestroy/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Agregar el token en el encabezado
            }
        });
    },

    // apis para insignias -----------------------------------------------------------------------------

    //Crear insignias
    badgeRegister:(name, description, points_required, token) => {
        return axios.post(`${urlApiBadge}create/`, {
            name,
            description,
            points_required,
        }, {
            headers: {
                'Authorization': `Bearer ${token}` // Agregar el token en el encabezado
            }
        });
    },

    // listar insignias
    badgeList: (token) => {
        return axios.get(`${urlApiBadge}listBadge/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },

    //actualizar insignia
    badgekUpdate: (id, datosActualizados, token) => {
        return axios.patch(`${urlApiBadge}UpdateModifyDestroy/${id}`, datosActualizados, {
            headers: {
                'Authorization': `Bearer ${token}` // Agregar el token en el encabezado
            }
        });
    },

    //Eliminar insignias
    badgeDelete: (id, token) => {
        return axios.delete(`${urlApiBadge}UpdateModifyDestroy/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Agregar el token en el encabezado
            }
        });
    },

    //apis de enlace de id usario e insignia------------------------------------------------------------

    //Crear insignias
    badgeUBRegister:(userId, badgeId, token) => {
        return axios.post(`${urlApiBadge}createUB/`, {
            user: userId, 
            badge: badgeId
        }, {
            headers: {
                'Authorization': `Bearer ${token}` // Agregar el token en el encabezado
            }
        });
    },

     // listar insignias
     badgeUBList: (token) => {
        return axios.get(`${urlApiBadge}listUserBadge/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },
};
export default api;
