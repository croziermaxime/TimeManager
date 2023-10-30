defmodule TimeManagerApi.Repo.Migrations.CreateWorkingtimes do
  use Ecto.Migration

  def change do
    create table(:workingtimes) do
      add :start, :naive_datetime
      add :end, :naive_datetime
      add :user, references(:users, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:workingtimes, [:user])
  end
end
