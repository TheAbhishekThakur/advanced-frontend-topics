import React, { useActionState } from "react";
const UseActionStateComponent = () => {
  const [formState, submitAction, isPending] = useActionState(login, {
    username: "",
    password: "",
  });

  async function login(previousData, formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    console.log(previousData, formData);
    console.log(username, password);

    await new Promise((res) => setTimeout(res, 2000));

    return { ...previousData, username, password };
  }
  return (
    <div>
      <form action={submitAction}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            defaultValue={formState.username}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            defaultValue={formState.password}
          />
        </div>
        <button disabled={isPending}>Login</button>
      </form>
    </div>
  );
};

export default UseActionStateComponent;
