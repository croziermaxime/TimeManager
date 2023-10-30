defmodule TimeManagerApiWeb.UserController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.Users
  alias TimeManagerApi.Users.User

  alias TimeManagerApi.TimeManagement
  alias TimeManagerApi.TimeManagement.Clock

  action_fallback TimeManagerApiWeb.FallbackController

  def get_all_users(conn, _params) do
    users = Users.list_users()
    render(conn, :index, users: users)
  end

  def create(conn, %{"email" => email, "username" => username}) do
    with {:ok, %User{} = user} <- Users.create_user(%{email: email, username: username}) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/users/#{user}")
      |> render(:show, user: user)
    end
  end

  def get_users_at_work_or_not(conn, %{"status" => status}) do
    target_status = status == "true"
    users = Users.list_users()
    result_users = Enum.reduce(users, [], fn %User{id: user_id, username: username, email: email}, acc ->
      clocks = TimeManagement.get_last_clock_by_userid!(user_id)
      case clocks do
        [] ->
          if target_status == false do
            [%User{id: user_id, username: username, email: email} | acc]
          else
            acc
          end
        [%Clock{status: sstatus} | _] when sstatus == target_status ->
          [%User{id: user_id, username: username, email: email} | acc]
        _ ->
          acc
      end
    end)
    render(conn, :index, users: result_users)
  end

  def get_user_by_username_email(conn, %{"email" => email, "username" => username}) do
    user = Users.get_user_by_username_email!(email, username);
    render(conn, :show, user: user)
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, :show, user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, :show, user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
