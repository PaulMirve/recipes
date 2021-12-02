import { useFollowUserMutation, User } from "generated/graphql";
import { showErrorAlert } from "helpers/show-alert";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useGlobalContext } from "./useGlobalContext";

export const useFollow = ({ username, followers }: { username: string, followers: User[] }) => {
    const { user } = useGlobalContext();
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const [isMe, setIsMe] = useState<boolean>(false);
    const [followUser] = useFollowUserMutation({
        variables: {
            username
        }
    });
    const router = useRouter();

    useEffect(() => {
        setIsFollowed(followers.some(usr => usr.username === user?.username));
        setIsMe(user?.username === username);
    }, [user])

    const follow = async () => {
        if (user) {
            try {
                await followUser();
                setIsFollowed(prev => !prev);
            } catch (err) {
                showErrorAlert();
            }
        } else {
            router.push('/login');
        }
    }

    return {
        follow,
        isFollowed,
        isMe
    }
}