import ChangeProfilePicture from "./ChangeProfilePicture"
import EditProfile from "./EditProfile"

export default function Settings() {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-indigo-600">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
    </>
  )
}