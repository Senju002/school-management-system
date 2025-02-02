import { Avatar } from "@material-tailwind/react";
import ProfilePicture from "../../../public/images/pfp.jpg";

export default function UserIcon(props) {
    return (
        <Avatar
            withBorder={true}
            color="blue"
            src={ProfilePicture}
            alt="avatar"
            className="  shadow-[0_0_80px_2px_rgba(3,78,162,0.6)]"
        />
    );
}
