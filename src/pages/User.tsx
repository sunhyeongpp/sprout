import BoardGrid from "../components/BoardGrid";
import Button from "../components/Button";
import { getSpecificUser } from "../api/users";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Back from "../assets/back.svg";

interface PostType {
  _id: string;
  channel: string;
  image: string;
}

interface SpecificUserType {
  fullName: string;
  email: string;
  followers: string[];
  following: string[];
  posts: PostType[];
}

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [specificUser, setSpecificUser] = useState<SpecificUserType | null>(
    null
  );

  useEffect(() => {
    const fetchSpecificUser = async () => {
      try {
        if (id) {
          const user = await getSpecificUser(id);
          setSpecificUser(user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSpecificUser();
  }, [specificUser]);

  if (!specificUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="h-[100px] px-[30px] sticky top-0 left-0 flex justify-between items-center dark:text-white bg-white dark:bg-black border-b border-whiteDark dark:border-gray">
        <button onClick={() => navigate(-1)} className="">
          <img
            className="dark:invert dark:hover:fill-white"
            src={Back}
            alt="back icon"
          />
        </button>
      </div>
      <div className="py-[70px] px-[50px] text-black dark:text-white flex flex-col items-center">
        <div className="w-full max-w-[826px]">
          <div className="flex mb-[30px] items-end gap-[30px]">
            <div className="w-[220px] h-[220px] bg-whiteDark rounded-[8px]"></div>
            <div className="flex flex-col gap-[50px]">
              <div className="flex flex-col gap-[10px]">
                <h2 className="text-[22px] font-bold">
                  {specificUser.fullName}
                </h2>
                <p className="text-lg text-gray dark:text-whiteDark">
                  {specificUser.email}
                </p>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="flex gap-[30px]">
                  <div className="flex items-center gap-[10px]">
                    <span className="font-bold">팔로우</span>{" "}
                    <span className="text-gray dark:text-whiteDark">
                      {specificUser.followers.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <span className="font-bold">팔로잉</span>{" "}
                    <span className="text-gray dark:text-whiteDark">
                      {specificUser.following.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <span className="font-bold">포스트</span>{" "}
                    <span className="text-gray dark:text-whiteDark">
                      {specificUser.posts.length}
                    </span>
                  </div>
                </div>
                {/* id가 내 id이면 프로필 수정 버튼 / 아니면 팔로잉 버튼 */}
                <Button text={"팔로잉"} size={"md"} className="max-w-[188px]" />
              </div>
            </div>
          </div>
          <BoardGrid posts={specificUser.posts} />
        </div>
      </div>
    </>
  );
}
