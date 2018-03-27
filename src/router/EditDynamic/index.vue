<template>
  <div class="editor">
    <div class="main">
      <div class="item type" style="margin-bottom: 10px;">
        <div class="label">文章类型</div>
        <div class="content">
          <RadioGroup v-model="type">
            <Radio :label="0">
              <Icon type="0"></Icon>
              <span>公司动态</span>
            </Radio>
            <Radio :label="1">
              <Icon type="1"></Icon>
              <span>平台数据</span>
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="item header">
        <div class="label">文章标题</div>
        <div class="content">
          <Input v-model="title" @on-change="setTitle" size="large" placeholder="请输入文章标题..."/>
        </div>
      </div>
      <div class="item image">
        <div class="label">文章缩略图</div>
        <div class="content">
          <div v-if="image" class="img-wrap">
            <img :src="image" alt="">
          </div>
          <div v-if="progress && !image" class="img-progress">
            <Progress :percent="progress"></Progress>
          </div>
          <Upload
              v-if="progress === 0 && !image"
              ref="upload"
              :show-upload-list="false"
              :headers="{'X-AUTH-TOKEN': token}"
              name="img"
              :on-progress="uploading"
              :on-success="uploadSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              type="drag"
              action="http://47.97.113.61:8087/news/image"
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
          </Upload>
        </div>
      </div>
      <div class="item article">
        <div class="label">文章内容</div>
        <div class="content">
          <quillEditor
            ref="editor"
            v-model="content"
            :options="editorOption"
            @change="changeEditore">
          </quillEditor>
          <input @change="emitImageInfo($event)" ref="fileInput" id="file-upload" accept="image/jpg,image/jpeg,image/png,image/gif" type="file" style="display:none;">
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <Button class="cancel" type="warning" @click="cancel" style="width: 80px;">取消</Button>
      <Button type="primary" @click="save" style="width: 100px;">保存</Button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import {Input, Button, Upload, Icon, RadioGroup, Radio} from 'iview'
import Cookies from 'js-cookie'
export default {
  components: {
    Input, Button, Upload, Icon, quillEditor, RadioGroup, Radio
  },
  data () {
    return {
      token: Cookies.get('token') || '',
      type: null,
      title: '',
      image: '',
      content: '',
      progress: 0,
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
  computed: {
    ...mapState({
      newsDetails: state => state.news.newsDetails
    }),
    editor () {
      return this.$refs.editor.quill
    }
  },
  methods: {
    async setDefault () {
      await this.$store.dispatch('news/fetchNewsDetails', {
        id: this.$route.query.id
      })
      this.type = Number(this.newsDetails.type)
      this.title = this.newsDetails.title
      this.image = this.newsDetails.image
      this.content = this.newsDetails.content
    },
    setTitle (ev) {
      this.title = ev.target.value
    },
    // 上传图片
    uploading (event, file, fileList) {
      const {loaded, total} = event
      this.progress = loaded / total * 100
    },
    uploadSuccess (res, file) {
      if (res !== 'fail') {
        this.image = res
        this.progress = 0
        this.$message.success('上传成功!')
      } else this.$message.error('上传失败!')
    },
    // 编辑器
    setImageBtn () {
      const toolbar = this.editor.getModule('toolbar')
      toolbar.addHandler('image', this.customImageHandler)
    },
    customImageHandler () {
      this.$refs.fileInput.click()
    },
    changeEditore (editor) {
      // console.log(editor)
      // this.content = editor.html
      console.log(this.content)
    },
    async emitImageInfo ($event) {
      const file = $event.target.files[0]
      const Editor = this.editor
      const range = Editor.getSelection()
      const cursorLocation = range.index
      console.log('imageAdded', file, Editor, cursorLocation)

      const url = await this.uploadImage(file)

      this.editor.insertEmbed(cursorLocation, 'image', url)
    },
    async uploadImage (file) {
      const formData = new FormData()
      formData.append('img', file)

      const res = this.$axios.post('http://47.97.113.61:8087/news/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res.data) return res.data
      else return false
    },
    cancel () {
      this.$router.history.go(-1)
    },
    async save () {
      await this.$store.dispatch('news/alterNews', {
        id: Number(this.$route.query.id),
        image: this.image,
        type: this.type,
        title: this.title,
        content: this.content
      })
    }
  },
  async mounted () {
    this.setImageBtn()
    await this.setDefault()
  }
}
</script>

<style lang="less" scoped>
.editor {
  flex: 1;
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
