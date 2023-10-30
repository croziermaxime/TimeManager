<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { Clock } from "@/types/Clock";
import ClocksServices from "../services/clocksServices";

    //***************************************************************************************
    // Props

    const props = defineProps<{
        userId: number
    }>();
    const userId = props.userId;
    
    //***************************************************************************************
    // Fields

    const clocksData = ref<Clock[]>();
    const currentStatus = ref<boolean>(false);

    const clockServices = new ClocksServices();

    //***************************************************************************************
    // Handler
    
    function onLogTimeClick(){

        // Get current locale time and convert it to ISO format
        const now = new Date();
        const currentIsoDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();
        
        clockServices.postClock(userId,{
            time: currentIsoDate,
            status: !currentStatus.value
        })
        .then(() =>{
            currentStatus.value = !currentStatus.value;
         })
        .catch(err => console.log("err", err));
    }

    //***************************************************************************************
    // Lifecycle
    watch(currentStatus, () => {
        clockServices.getClocks(userId)
            .then(res => {
                
                const newClockData = res.reverse();
                clocksData.value = newClockData;
                if(currentStatus.value !== newClockData[0].status)
                    currentStatus.value = newClockData[0].status;
            })
            .catch(err => console.log(err));
    });

    onMounted(() => {
        clockServices.getClocks(userId)
        .then(res => {
            const newClockData = res.reverse();
            clocksData.value = newClockData;
            currentStatus.value = newClockData[0].status;
        })
        .catch(err => console.log(err));
    });
</script>

<template>
    <v-card width="500" class="mt-9">
        <v-card-title class="px-5 pt-5">
            <v-row justify="space-between">
                <span>Badgeage</span>
                <v-btn v-on:click="onLogTimeClick">Badger</v-btn>
            </v-row>
            <v-row>
                <v-sheet height="20" width="20" class="mr-2 rounded-circle mt-2" :class="currentStatus.valueOf() ? 'bg-green' : 'bg-red'" ></v-sheet>
                <v-sheet>{{ currentStatus.valueOf() ? "Entrée" : "Sortie"  }}</v-sheet>
            </v-row>
        </v-card-title>
        <v-list density="compact">
            <v-list-subheader class="bg-grey d-flex py-0">
                historique
            </v-list-subheader>
            <v-list-item
                v-for="(clock, i) in clocksData"
                :key="i"
                :value="clock"
                color="primary"
            >
            <v-row  :class="clock.status ? 'text-green' : 'text-red'">
                <v-col cols="2">{{ clock.status ? "Entrée" : "Sortie" }} :</v-col>
                <v-col cols="2" class="text-body-1 text-right">Le</v-col>
                <v-col cols="3" class="text-body-2">
                    {{ new Date(clock.time).toLocaleDateString() }}
                </v-col>
                <v-col cols="1">à</v-col>
                <v-col cols="3">{{ new Date(clock.time).toLocaleTimeString() }}</v-col>
            </v-row>
            </v-list-item>
        </v-list>
    </v-card>
</template>
