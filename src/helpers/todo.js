import VueMoment from "vue-moment";
import Vue from "vue";
import moment from "moment";

Vue.use(VueMoment);
export const sortTasksByDate = tasks => {
  return tasks.sort((task1, task2) => {
    if (moment(task1.created).unix() < moment(task2.created).unix()) {
      return 1;
    } else if (moment(task1.created).unix() > moment(task2.created).unix()) {
      return -1;
    }
    return 0;
  });
};

export const sortTasksByGroup = tasks => {
  const favorite = tasks.filter(task => task.starred && !task.completed);
  const usual = tasks.filter(task => !task.starred && !task.completed);
  const completed = sortTasksByDate(tasks.filter(task => task.completed));

  const sortedCompleted = [
    ...completed.sort((task1, task2) => {
      if (task1.starred && !task2.starred) {
        return -1;
      } else if (!task1.starred && task2.starred) {
        return 1;
      }
      return 0;
    })
  ];

  return [
    ...sortTasksByDate(favorite),
    ...sortTasksByDate(usual),
    ...sortedCompleted
  ];
};

export const sortTasksByName = tasks => {
  return tasks.sort((a, b) => a.text.localeCompare(b.text));
};

export const sortTasksAsc = tasks => {
  return tasks.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
};

export const sortTasksDesc = tasks => {
  return tasks.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
};

export const filterTasksByMessage = (tasks, filter) => {
  if (filter.trim() !== "") {
    return tasks.filter(task =>
      task.text.toLowerCase().includes(filter.toLowerCase())
    );
  }

  return tasks;
};

export const filterTasksByCategory = (tasks, filter) => {
  if (filter.trim() !== "") {
    return tasks.filter(task => task.categoryArray.includes(filter));
  }

  return tasks;
};
