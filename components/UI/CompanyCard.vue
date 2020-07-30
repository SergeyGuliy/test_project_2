<template>
  <div id="CompanyCard" @click="$router.push(`/${project.id}`)">
    <div class="about">
      <img
        :src="project.logo_url"
        alt=""
        class="logo"
        v-if="project.logo_url"
      >
      <div class="logo empty" v-else>None</div>
      <div class="name">{{project.name}}</div>
    </div>
    <div class="status">
      <div class="status__active" v-if="project.is_active === 1">
        Active
      </div>
      <div class="status__unactive" v-else>
        Unactive
      </div>
    </div>
    <div class="time">
      <div class="time-row">
        <div class="time-header">time this week</div>
        <div class="time-timer">{{project.spent_time_week ? project.spent_time_week : 'Default time'}}</div>
      </div>
      <div class="time-row">
        <div class="time-header">this mounth</div>
        <div class="time-timer">{{project.spent_time_month ? project.spent_time_month : 'Default time'}}</div>
      </div>
      <div class="time-row">
        <div class="time-header">total</div>
        <div class="time-timer">{{project.spent_time_all ? project.spent_time_all : 'Default time'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CompanyCard",
    data() {
      return {
        // In response i don't seen an time, so i mocked it
        defaultTime: '00:00:00'
      }
    },
    components: {},
    props: {
      project: {
        required: true,
        type: Object,
      }
    },
  }
</script>

<style lang='scss'>
  #CompanyCard {
    cursor: pointer;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    @media (max-width: 950px) {
      flex-direction: column;
      justify-content: start;
    }
    @media (max-width: 500px) {
      padding: 5px;

    }
    .about{
      width: 45%;
      display: flex;
      align-items: center;
      @media (max-width: 950px) {
        width: 85%;
        margin-bottom: 10px;
      }
      @media (max-width: 500px) {
        flex-direction: column;
        .logo{
          margin-bottom: 10px;
        }
      }


      .logo{
        width: 50px;
        height: 50px;
        outline: none;
        margin-right: 10px;
        &.empty{
          border: 1px solid black;
          border-radius: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }
      }
      .name{

        font-size: 16px;
        font-weight: 700;
      }

    }
    .status{
      width: 20%;
      display: flex;
      justify-content: center;
      @media (max-width: 950px) {
        width: 85%;
        margin-bottom: 10px;
        justify-content: start;
      }
      @media (max-width: 500px) {
        justify-content: center;
      }
      &__active{
        color: green;
        font-weight: 700;
      }
      &__unactive{
        color: red;
        font-weight: 700;
      }
    }
    .time{
      width: 35%;
      @media (max-width: 950px) {
        width: 85%;
        margin-bottom: 10px;
      }
      &-row{
        display: flex;
        justify-content: space-between;
      }
      &-header{
        margin-right: 15px;
      }
      &-timer{
        font-weight: 700;

      }
    }
  }
</style>
