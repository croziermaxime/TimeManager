defmodule TimeManagerApi.TimeManagementFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `TimeManagerApi.TimeManagement` context.
  """

  @doc """
  Generate a clock.
  """
  def clock_fixture(attrs \\ %{}) do
    {:ok, clock} =
      attrs
      |> Enum.into(%{
        status: true,
        time: ~N[2023-10-23 11:29:00]
      })
      |> TimeManagerApi.TimeManagement.create_clock()

    clock
  end

  @doc """
  Generate a workingtime.
  """
  def workingtime_fixture(attrs \\ %{}) do
    {:ok, workingtime} =
      attrs
      |> Enum.into(%{
        end: ~N[2023-10-23 12:14:00],
        start: ~N[2023-10-23 12:14:00]
      })
      |> TimeManagerApi.TimeManagement.create_workingtime()

    workingtime
  end
end
