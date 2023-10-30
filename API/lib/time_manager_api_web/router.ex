defmodule TimeManagerApiWeb.Router do
  alias ClockController
  alias UserController
  alias WorkingtimeController
  alias ClockController
  use TimeManagerApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", TimeManagerApiWeb do
    pipe_through :api

    get "/users/atwork/:status", UserController, :get_users_at_work_or_not
    get "/users/all", UserController, :get_all_users
    get "/users", UserController, :get_user_by_username_email
    resources "/users", UserController

    get "/workingtimes/all/user/:userID", WorkingtimeController, :get_workingtimes_of_user
    get "/workingtimes/:userID", WorkingtimeController, :get_workingtime_of_user_by_time_range
    get "/workingtimes/:userID/:id", WorkingtimeController, :get_workingtime_of_user_by_id
    post "/workingtimes/:userID", WorkingtimeController, :create_workingtime_by_userid
    resources "/workingtimes", WorkingtimeController

    get "/clocks/last/:userID", ClockController, :get_last_clock_by_userid
    get "/clocks/:userID", ClockController, :get_clock_by_userid
    post "/clocks/:userID", ClockController, :create_clock_by_userid
    resources "/clocks", ClockController
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:time_manager_api, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: TimeManagerApiWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
