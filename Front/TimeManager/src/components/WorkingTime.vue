<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import WorkingTimeServices from "@/services/workingtimeService";
import type { WorkingTime } from "@/types/workingTime";

const userIdStorage = sessionStorage.getItem("userId")

export default defineComponent({
  name: 'WorkingTimeVue',
  props: {
    userId: Number,
  },
  setup(props) {
    const startTime = ref("");
    const endTime = ref("");
    const selectedWorkingTime = ref(null);

    const workingTimeServices = new WorkingTimeServices();
    const workingTimes = ref([{ id: 1, start: '2020-01-01 22:22:22', end: '2020-01-01 22:22:22', user: 1}]);


    onMounted(() => {
      getAllWorkingTimesOfUser(Number(userIdStorage));
    });

    const getAllWorkingTimesOfUser = async (userId: number) => {
      try {
        const response = await workingTimeServices.getEveryWorkingTimeByUserId(userId)
        console.log('workingTimes', workingTimes)
      } catch (error) {
        console.error('Erreur lors de la récupération des working times :', error);
      }
    };


    const createWorkingTime = async (userId: number) => {
      const startDate = startTime.value
      const endDate =  endTime.value
      const workingTime: WorkingTime = {
        id: 1,
        user: userId,
        start: startDate,
        end: endDate
      };
      await workingTimeServices.postWorkingTime(userId, workingTime)
      await getAllWorkingTimesOfUser(userId);
    };


    const deleteWorkingTime = async (id: number, userId: number) => {
      try {
        await workingTimeServices.deleteWorkingTime(id)
        await getAllWorkingTimesOfUser(userId);
        console.log('working Time deleted')
      } catch (err) {
        console.log(err)
      }
    };

    return {
      startTime,
      endTime,
      workingTimes,
      selectedWorkingTime,
      createWorkingTime,
      deleteWorkingTime,
      userIdStorage
    };

  },
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="manageWorkingTime">
          <h2>Working Times</h2>
          <v-table>
            <thead>
            <tr>
              <th>Working Time ID</th>
              <th>User ID</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="workTime in workingTimes" :key="workTime.id">
              <td>{{ workTime.id }}</td>
              <td>{{ workTime.user }}</td>
              <td>{{ workTime.start.replace('T', ' ') }}</td>
              <td>{{ workTime.end }}</td>
              <td>
                <v-btn color="warning" @click="deleteWorkingTime(workTime.id, Number(userIdStorage))">Edit</v-btn>
              </td>

              <td>
                <v-btn color="error" @click="deleteWorkingTime(workTime.id, Number(userIdStorage))">Delete</v-btn>
              </td>
            </tr>
            </tbody>
          </v-table>
        </div>
      </v-col>

      <v-col cols="6">
        <v-form @submit.prevent="createWorkingTime(Number(userIdStorage))" class="createModifyForm">
          <h2>Create</h2>
          <v-text-field v-model="startTime" label="Start Time" type="datetime-local" required></v-text-field>
          <v-text-field v-model="endTime" label="End Time" type="datetime-local" required></v-text-field>
          <v-btn color="primary" type="submit">Create</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

  <style scoped>
    .manageWorkingTime {
      margin: 1rem;
    }

    .workingTimeDetails {
      background-color: #f0f0f0;
      padding: 10px;
      border-radius: 5px;
    }

    .createModifyForm {
      background-color: #f0f0f0;
      padding: 10px;
      border-radius: 5px;
    }
  </style>

