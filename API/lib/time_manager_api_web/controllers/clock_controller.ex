defmodule TimeManagerApiWeb.ClockController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.TimeManagement
  alias TimeManagerApi.TimeManagement.Clock

  alias TimeManagerApi.TimeManagement.WorkingTime

  action_fallback TimeManagerApiWeb.FallbackController

  def index(conn, _params) do
    clocks = TimeManagement.list_clocks()
    render(conn, :index, clocks: clocks)
  end

  def create(conn, %{"clock" => clock_params}) do
    with {:ok, %Clock{} = clock} <- TimeManagement.create_clock(clock_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/clocks/#{clock}")
      |> render(:show, clock: clock)
    end
  end

  def create_clock_by_userid(conn, %{"userID" => id, "status" => status}) do
    now = DateTime.utc_now()
    case TimeManagement.get_last_clock_by_userid!(id) do
      [lastClock] ->
        if lastClock.status do
          #Last time was true, creating a false Clock and a WorkingTime (sortie)
          TimeManagement.create_workingtime(%{"user" => id, "start" => lastClock.time, "end" => now})
          with {:ok, %Clock{} = clock} <- TimeManagement.create_clock(%{"user" => id, "status" => false, "time" => now}) do
            conn
            |> put_status(:created)
            |> put_resp_header("location", ~p"/api/clocks/#{clock}")
            |> render(:show, clock: clock)
          end
        else
          #Last clocking was false, creating a true clock (entrée)
          with {:ok, %Clock{} = clock} <- TimeManagement.create_clock(%{"user" => id, "status" => true, "time" => now}) do
            conn
            |> put_status(:created)
            |> put_resp_header("location", ~p"/api/clocks/#{clock}")
            |> render(:show, clock: clock)
          end
        end
      [] ->
        #Create the first clock record for user (première entrée)
        with {:ok, %Clock{} = clock} <- TimeManagement.create_clock(%{"user" => id, "status" => true, "time" => now}) do
          conn
          |> put_status(:created)
          |> put_resp_header("location", ~p"/api/clocks/#{clock}")
          |> render(:show, clock: clock)
        end
      _ ->
        IO.puts("An unexpected error occurred")
    end
  end

  def get_clock_by_userid(conn, %{"userID" => userID}) do
    clock = TimeManagement.get_clock_by_userid!(userID)
    render(conn, :index, clocks: clock)
  end

  def get_last_clock_by_userid(conn, %{"userID" => userID}) do
    clock = TimeManagement.get_last_clock_by_userid!(userID)
    render(conn, :index, clocks: clock)
  end

  def show(conn, %{"id" => id}) do
    clock = TimeManagement.get_clock!(id)
    render(conn, :show, clock: clock)
  end

  def update(conn, %{"id" => id, "clock" => clock_params}) do
    clock = TimeManagement.get_clock!(id)

    with {:ok, %Clock{} = clock} <- TimeManagement.update_clock(clock, clock_params) do
      render(conn, :show, clock: clock)
    end
  end

  def delete(conn, %{"id" => id}) do
    clock = TimeManagement.get_clock!(id)

    with {:ok, %Clock{}} <- TimeManagement.delete_clock(clock) do
      send_resp(conn, :no_content, "")
    end
  end
end
