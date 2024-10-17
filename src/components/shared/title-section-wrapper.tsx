'use client'

import { useEffect, useState } from 'react';
import { TitleSection } from './title-section';
import { getUser } from '@/lib/actions/user.action';
import { UserType } from '@/types';

const TitleSectionWrapper = ({ open }: { open: boolean }) => {
    const [user, setUser] = useState<UserType | null>(null);

    const fetchUser = async () => {
        const userData = await getUser();
        setUser(userData ?? null )
    };

    useEffect(() => {
       
        fetchUser();
   
    }, []);

    return (
        <TitleSection open={open} user={user} />
  )
}

export default TitleSectionWrapper
