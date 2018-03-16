<template lang="html">
  <div class="rich-editor">
    <div ref="quill" id="quill-container"></div>
    <input @change="emitImageInfo($event)" ref="fileInput" id="file-upload" accept="image/jpg,image/jpeg,image/png,image/gif" type="file" style="display:none;">
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
export default {
  props: {
    option: {
      type: Object,
      default () {
        return {}
      }
    },
    value: {
      type: String,
      default: ''
    },
    maxLength: {
      type: Number,
      default: 10
    },
    maxImageSize: {
      type: Number,
      default: 120
    }
  },
  data () {
    return {
      workorderinfo: {
        name: ''
      },
      content: '',
      quill: null,
      editor: null
    }
  },
  computed: {
    quillOption () {
      return {
        placeholder: '请输入...',
        theme: 'snow',
        ...this.option,
        modules: {
          ...this.option.modules,
          toolbar: (this.option.modules && [...this.option.modules.toolbar]) || ['bold', 'italic', 'link', 'underline', 'image']
        }
      }
    }
  },
  methods: {
    initQuill () {
      console.log(this.quillOption)
      if (!this.quill) this.quill = new Quill(this.$refs.quill, this.quillOption)
      this.editor = document.querySelector('#quill-container .ql-editor')
      this.editor.innerHTML = this.value || ''
    },
    updateEditor () {
      this.quill.on('text-change', () => {
        this.content = this.editor.innerHTML
        this.$emit('input', this.editor.innerHTML)
        this.$emit('text-change', this.editor.innerHTML)
      })
    },
    setImageBtn () {
      const toolbar = this.quill.getModule('toolbar')
      toolbar.addHandler('image', this.customImageHandler)
    },
    customImageHandler () {
      this.$refs.fileInput.click()
    },
    async emitImageInfo ($event) {
      const file = $event.target.files[0]
      const Editor = this.quill
      const range = Editor.getSelection()
      const cursorLocation = range.index
      console.log('imageAdded', file, Editor, cursorLocation)
      if (file.size / 1024 > this.maxImageSize) return this.$message({type: 'warning', message: `图片不得超过${this.maxImageSize}KB！`})
      const res = await this.uploadImage(file)
      this.quill.insertEmbed(cursorLocation, 'image', res.data)
      // this.quill.insertText(cursorLocation, `<img src=${res.data} />`)
      this.editor.querySelectorAll('.ql-align-center').forEach(item => {
        item.style.textAlign = 'center'
      })
    },
    async uploadImage (file) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await (await window.fetch('http://mapi.1mifd.com//zuul/common/file/upload/IMAGE_URL', {
        headers: {
          'X-AUTH-TOKEN': localStorage.getItem('token')
        },
        method: 'POST',
        body: formData
      })).json()
      return res
    }
  },
  mounted () {
    this.initQuill()
    this.updateEditor()
    this.setImageBtn()
  },
  created () {
  },
  watch: {
    value (val) {
      if (val === '') this.editor.innerHTML = val
    }
  }
}
</script>

<style scoped lang="less">
</style>
<style lang="less">
</style>
