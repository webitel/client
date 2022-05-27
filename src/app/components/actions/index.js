import Vue from 'vue';
import AddAction from './add-action.vue';
import CopyAction from './copy-action.vue';
import DeleteAction from './delete-action.vue';
import DeleteAllAction from './delete-all-action.vue';
import DownloadAction from './download-action.vue';
import EditAction from './edit-action.vue';
import HistoryAction from './history-action.vue';

const actions = [
  AddAction,
  CopyAction,
  DeleteAction,
  DeleteAllAction,
  DownloadAction,
  EditAction,
  HistoryAction,
];

actions.forEach((component) => {
  Vue.component(component.name, component);
});
