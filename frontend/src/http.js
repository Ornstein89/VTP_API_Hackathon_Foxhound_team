import Axios from 'axios';
import Vue from 'vue';

export default {
    urls: {
        WebSocketSchema: '/rest_api/web_socket_schema/',
        WebSocketCallback: '/rest_api/web_socket_callback/',
        Violation: '/rest_api/violation/',
        AllowedFile: '/rest_api/allowed_file/',
        WebSocketSchemaStat: '/rest_api/web_socket_schema/stats/',
        AllowedFileStat: '/rest_api/allowed_file/stats/',
        WSChart: '/rest_api/violation/chart/',
        FileChart: '/rest_api/file/chart/',
        WebSocketAllowedOrigin: '/rest_api/web_socket_allowed_origin/',
        FileProxy: '/rest_api/files_proxy/',
        FileInfo: '/rest_api/file/',
    },
    getFilterValues: async function (filters) {
        var filter = "";
        if (Object.keys(filters).length != 0) {
            filter = "?";
            for (const key in filters) {
                const element = filters[key];
                filter += `${key}=${element}&`;
            }
            filter = filter.slice(0, filter.lastIndexOf('&'))

        }
        return filter
    },
    getHeaders(){
        return {
            'X-CSRFToken': Vue.$cookies.get('csrftoken'),
        }
    },
    getList: async function (url_name, filters = {}, raise_exception = false) {
        var filter = (await this.getFilterValues(filters));
        try {
            return (await Axios.get(`${this.urls[url_name]}${filter}`, {headers: this.getHeaders()}))
        } catch (error) {
            if (raise_exception) {
                Vue.showErrorModal(error.response.data);
                return { data: [] }
            }
            return error.response;
        }
    },
    getItem: async function (url_name, id, raise_exception = false) {
        try {
            return (await Axios.get(`${this.urls[url_name]}${id}/`, {headers: this.getHeaders()}))
        } catch (error) {
            if (raise_exception) {
                Vue.showErrorModal(error.response.data);
                return { data: {} }
            }
            return error.response;
        }
    },
    createItem: async function (url_name, data, raise_exception = false) {
        try {
            return (await Axios.post(`${this.urls[url_name]}`, data, {headers: this.getHeaders()}))
        } catch (error) {
            if (raise_exception) {
                Vue.showErrorModal(error.response.data);
                return { data: data };
            }
            return error.response;
        }
    },
    updateItem: async function (url_name, id, data, raise_exception = false) {
        try {
            return (await Axios.put(`${this.urls[url_name]}${id}/`, data, {headers: this.getHeaders()}))
        } catch (error) {
            if (raise_exception) {
                Vue.showErrorModal(error.response.data);
                return { data: data };
            }
            return error.response;
        }
    },
    deleteItem: async function (url_name, id, raise_exception = false) {
        try {
            return (await Axios.delete(`${this.urls[url_name]}${id}/`, {headers: this.getHeaders()}))
        } catch (error) {
            if (raise_exception) {
                Vue.showErrorModal(error.response.data);
            }
            return error.response;
        }
    }
}
