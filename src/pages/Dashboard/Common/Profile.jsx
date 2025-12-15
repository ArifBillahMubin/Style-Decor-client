import useAuth from "../../../hooks/useAuth";
import coverImg from "../../../assets/images/banner/banner3.jpg";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const { user } = useAuth();
  const { role, iseRoleLoading } = useRole();

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 py-16">
      <div className="bg-base-100 shadow-xl rounded-3xl w-full max-w-3xl overflow-hidden border border-base-300">

        {/* COVER */}
        <div className="relative">
          <img
            src={coverImg}
            alt="cover"
            className="w-full h-56 object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* PROFILE CONTENT */}
        <div className="relative flex flex-col items-center px-6 pb-10 -mt-16">

          {/* AVATAR */}
          <img
            src={user?.photoURL}
            alt="profile"
            className="
              h-28 w-28 rounded-full object-cover
              border-4 border-base-100
              shadow-lg
            "
          />

          {/* ROLE */}
          {!iseRoleLoading && (
            <span className="
              mt-3 px-4 py-1 text-xs font-semibold rounded-full
              bg-primary/10 text-primary
              uppercase tracking-wide
            ">
              {role}
            </span>
          )}

          {/* USER ID */}
          <p className="mt-3 text-sm text-gray-500">
            User ID
          </p>
          <p className="text-xs text-gray-400 break-all text-center">
            {user?.uid}
          </p>

          {/* INFO CARD */}
          <div className="
            mt-8 w-full bg-base-200
            rounded-2xl p-6
          ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">

              {/* NAME */}
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-semibold text-gray-800">
                  {user?.displayName || "N/A"}
                </p>
              </div>

              {/* EMAIL */}
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-semibold text-gray-800 break-all">
                  {user?.email}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
