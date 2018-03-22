<template>
  <div class="editor">
    <div class="main">
      <div class="item header">
        <div class="label">文章标题</div>
        <div class="content">
          <Input v-model="title" @on-change="setTitle" size="large" placeholder="请输入文章标题..."/>
        </div>
      </div>
      <div class="item article">
        <div class="label">文章内容</div>
        <div class="content">
          <quillEditor :options="editorOption" @change="changeEditore"/>
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <Button class="cancel" type="warning" @click="cancel" style="width: 80px;">取消</Button>
      <Button type="primary" @click="create" style="width: 100px;">保存</Button>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import {Input, Button} from 'iview'
import moment from 'moment'
export default {
  components: {
    Input, Button, quillEditor
  },
  data () {
    return {
      title: '',
      content: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
        }
      },
      placeholder: '请输入文章主干...'
    }
  },
  methods: {
    setTitle (ev) {
      this.title = ev.target.value
      console.log(ev.target.value)
    },
    changeEditore (editor) {
      console.log(editor)
      this.content = editor.html
    },
    cancel () {
      this.$router.history.go(-1)
    },
    create () {
      const res = {
        title: this.title,
        content: this.content,
        create_time: moment(new Date()).format('YYYY-MM-DD HH:mm')
      }
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.editor {
  padding: 15px;
  .main {
    .header {
      margin-bottom: 15px;
    }
    .item {
      .label {
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 6px;
        &::after {
          content: ":";
          margin: 0 8px 0 2px;
          position: relative;
          top: -0.5px;
        }
      }
      .content {
        padding: 0 10px;
      }
    }
  }
  .btn-wrap {
    text-align: center;
    padding-top: 20px;
    .cancel {
      margin-right: 20px;
    }
  }
}
</style>
