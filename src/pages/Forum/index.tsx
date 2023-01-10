import Header from "../../components/Header";
import { StyledForum } from "./styles";
import { useContext, useEffect, useState } from "react";
import { LoginRegisterContext } from "../../contexts/contexLoginRegister";
import { StyledButton } from "../../styles/Button";
import { AiFillHeart } from "react-icons/ai";
import { PostForm } from "../../components/Forms/ForumMessage";
// import ExpenseDate, { ShowDate, ShowNewDate } from "../../styles/Date";

const Forum = () => {
  const [favorites, setFavorites] = useState([] as object[]);

  const { forumMessagesRequest, posts, user, getAllUsersRequest, allUsers, userLikedPosts, setUserLikedPosts } =
    useContext(LoginRegisterContext);

  useEffect(() => {
    forumMessagesRequest();
    getAllUsersRequest();
  }, []);

  const updateFavorites = (userTarget: {}) => {
    if (favorites.findIndex(element => element === userTarget) === -1){
      setFavorites([...favorites, userTarget])
    } else if (favorites.findIndex(element => element === userTarget) >= 0){
      setFavorites(favorites.filter(element => element != userTarget))
    }
  };

  const onHeartClick = (userTarget: object) => {
    updateFavorites(userTarget)
  };

  const checkFavoriteButton = (element: any) => {
    if (favorites.some(item => item === element)){
      return "Remover"
    } else {
      return "Adicionar"
    }
  }

  const checkLikedPosts = (element: any) => {
    return userLikedPosts.findIndex(post => element === post) === -1 ? <AiFillHeart className="uncoloredHeart"/> : <AiFillHeart className="coloredHeart"/>
  }

  const likePost = (element: any) => {
    if (userLikedPosts.findIndex((x) => x === element) === -1){
      setUserLikedPosts([...userLikedPosts, element])
    } else if (userLikedPosts.findIndex((x) => x === element) >= 0){
      setUserLikedPosts(userLikedPosts.filter((x) => x !== element))
    }
  }

  function createForumCards (){
    const copyPosts = [...posts]

    return posts.reverse().map((post, index) =>
    <li key={index}>
      <div className="headerPostMessageDiv">
        <div className="divPostMessage">
          <img src={post?.avatar} alt="" />
          <h2>{post?.name}</h2>

        </div>
        <div className="divLikeButton">
          <button className="likeButton" onClick={() => likePost(post)}>
            { checkLikedPosts(post) }
          </button>
        </div>
      </div>
      <div className="bottomPostMessageDiv">
        <h2>{post.title}</h2>
        <p>{post.message}</p>
      </div>
    </li>
  )
  }

  return (
    <div>
      <Header />
      <StyledForum>
        <div className="headerForumPage">
          <div className="avatarImg">
            <img src={user?.avatar} alt="user avatar" />
          </div>
          <div className="userCard">
            <div className="userCardInfo">
              <div className="userCardName">
                <h2>Nome:</h2>
                <h3>{user?.name}</h3>
              </div>
              <div className="userCardMail">
                <h2>Email:</h2>
                <h3>{user?.email}</h3>
              </div>
            </div>
            {/* <p>following: {updateFavorites.length}</p> */}
          </div>
        </div>

        <div>
          <PostForm />
        </div>

        <div className="forumMessagePostsDiv">
          <h2>Posts</h2>
          <div className="forumContainer">
            <div className="ulForumDiv">
              <ul>
                {createForumCards ()}
              </ul>
            </div>

            <div className="listAllUsers">
              <ul>
                {allUsers?.map((singleUser, index) => (
                  <li key={index}>
                    <img src={singleUser.avatar} alt="user avatar" />
                    <div className="aboutAll">
                      <h2>{singleUser.name}</h2>
                      <StyledButton buttonSize="small" buttonStyle="primary" onClick={() => onHeartClick(singleUser)}>
                        {checkFavoriteButton(singleUser)}
                      </StyledButton>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </StyledForum>
    </div>
  );
};

export default Forum;
