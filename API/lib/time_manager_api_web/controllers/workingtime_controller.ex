defmodule TimeManagerApiWeb.WorkingtimeController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.TimeManagement
  alias TimeManagerApi.TimeManagement.Workingtime

  action_fallback TimeManagerApiWeb.FallbackController

  def index(conn, _params) do
    workingtimes = TimeManagement.list_workingtimes()
    render(conn, :index, workingtimes: workingtimes)
  end

  def get_workingtimes_of_user(conn, %{"userID" => userId}) do
    workingtime = TimeManagement.get_workingtimes_of_user!(userId)
    render(conn, :index, workingtimes: workingtime)
  end

  def get_workingtime_of_user_by_id(conn, %{"userID" => userId, "id" => id}) do
    workingtime = TimeManagement.get_workingtime_of_user_by_id!(id, userId)
    render(conn, :index, workingtimes: workingtime)
  end

  def get_workingtime_of_user_by_time_range(conn, %{"userID" => userId, "start" => start, "end" => endi}) do
    workingtime = TimeManagement.get_workingtime_of_user_by_time_range!(userId, start, endi)
    render(conn, :index, workingtimes: workingtime)
  end

  def create_workingtime_by_userid(conn, %{"userID" => userId, "start" => start, "end" => endi}) do
    with {:ok, %Workingtime{} = workingtime} <- TimeManagement.create_workingtime(%{"user" => userId, "start" => start, "end" => endi}) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/workingtimes/#{workingtime}")
      |> render(:show, workingtime: workingtime)
    end
  end

  def show(conn, %{"id" => id}) do
    workingtime = TimeManagement.get_workingtime!(id)
    render(conn, :show, workingtime: workingtime)
  end

  def update(conn, %{"id" => id, "workingtime" => workingtime_params}) do
    workingtime = TimeManagement.get_workingtime!(id)

    with {:ok, %Workingtime{} = workingtime} <- TimeManagement.update_workingtime(workingtime, workingtime_params) do
      render(conn, :show, workingtime: workingtime)
    end
  end

  def delete(conn, %{"id" => id}) do
    workingtime = TimeManagement.get_workingtime!(id)

    with {:ok, %Workingtime{}} <- TimeManagement.delete_workingtime(workingtime) do
      send_resp(conn, :no_content, "")
    end
  end
end
