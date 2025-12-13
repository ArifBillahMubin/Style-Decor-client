import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: role, isLoading: iseRoleLoading } = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const result = await axiosSecure(`/user/role`)
            return result.data.role
        }
    })

    return { role, iseRoleLoading }
};

export default useRole;