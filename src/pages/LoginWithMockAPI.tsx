import React, { useState } from 'react'

type LoginSuccessMessage = 'SUCCESS'
type LoginFailMessage = 'FAIL'

interface LoginResponse {
  message: LoginSuccessMessage | LoginFailMessage
  token: string
}

interface UserInfo {
  name : string
}

interface User {
  username : string,
  password : string,
  userInfo : UserInfo
}

const users : User[] = [
  {
    username : "Woony",
    password : "970304",
    userInfo : {name : "정찬우"}
  },
  {
    username : "Luna",
    password : "000906",
    userInfo : {name : "김문경"}
  },
  {
    username : "eoseo",
    password : "230128",
    userInfo : {name : "김이서"}
  }
] 

const _secret = "123@322^&%$#"

const login = async (username: string, password: string): Promise<LoginResponse | null> => {

  // TODO: 올바른 username, password를 입력하면 {message: 'SUCCESS', token: (원하는 문자열)} 를 반환하세요.
  const user = users.find((user)=>{
    return user.username === username && user.password === password
  })

  return user ? { message : "SUCCESS" , token : JSON.stringify({user:user.userInfo ,secret:_secret}) }: null
  
  
}

const getUserInfo = async (token: string): Promise<UserInfo | null> => {
  // TODO: login 함수에서 받은 token을 이용해 사용자 정보를 받아오세요.

  const parsedToken = JSON.parse(token)

  if(!parsedToken?.secret || parsedToken.secret !== _secret) return null
  
  const loggedUser  = users.find((user)=>{
    if(user.userInfo.name === parsedToken.user.name) return user
  })

  return loggedUser ? loggedUser.userInfo : null

 
}

const LoginWithMockAPI = () => {

  const [userInfo , setUserInfo] = useState<UserInfo>({name:''})

  const loginSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // TODO: form 에서 username과 password를 받아 login 함수를 호출하세요.
    const formData = new FormData(event.currentTarget);
    
    const loginRes = await login(formData.get('username') as string , formData.get('password') as string)
    if(!loginRes) return

    const userInfo = await getUserInfo(loginRes.token)
    if(!userInfo) return

    setUserInfo(userInfo)
  }

  return (<div>
    <h1>
      Login with Mock API
    </h1>
    <form onSubmit={loginSubmitHandler}>
      <label>
        Username:
        <input type="text" name="username"/>
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <input type="submit" value="Submit" />
      {/* TODO: 여기에 username과 password를 입력하는 input을 추가하세요. 제출을 위해 button도 추가하세요. */}
    </form>
    <div>
      <h2>
        User info
      </h2>
      {/* TODO: 유저 정보를 보여주도록 구현하세요. 필요에 따라 state나 다른 변수를 추가하세요. */}
      {JSON.stringify({username: 'blueStragglr'})} <br></br>
      {JSON.stringify(userInfo)}
    </div>
  </div>)
}

export default LoginWithMockAPI
