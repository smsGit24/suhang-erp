<template>
  <div class="dynamic">
    <Card shadow>
      <textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
    </Card>
    <Spin class="spin" fix v-if="spinShow">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载组件中...</div>
    </Spin>
    <Row :gutter="16">
      <iCol :span="24" class="btn-wrap">
        <Button type="default" @click="cancel">取消</Button>
        <Button type="primary" @click="create">保存</Button>
      </iCol>
    </Row>
  </div>
</template>

<script>
import tinymce from 'tinymce'
import {Row, Col, Button, Card, Spin, Icon} from 'iview'
export default {
  components: { iCol: Col, Row, Button, Card, Spin, Icon },
  data () {
    return {
      spinShow: true,
      editorValue: ''
    }
  },
  methods: {
    init () {
      this.$nextTick(() => {
        let vm = this
        let height = document.body.offsetHeight - 300
        tinymce.init({
          selector: '#tinymceEditer',
          branding: false,
          elementpath: false,
          height: height,
          language: 'zh_CN.GB2312',
          menubar: '',
          // menubar: 'edit insert view format table tools',
          plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
            'searchreplace visualblocks visualchars code fullpage',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'emoticons paste textcolor colorpicker textpattern imagetools codesample'
          ],
          toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
          // toolbar1: "undo redo | imageupload link | bold italic | alignleft aligncenter alignright alignjustify",
          imageupload_url: '{:U("File/uploadPicture")}',
          autosave_interval: '20s',
          image_advtab: true,
          table_default_styles: {
            width: '100%',
            borderCollapse: 'collapse'
          },
          setup: function (editor) {
            editor.on('init', function (e) {
              vm.spinShow = false
              if (localStorage.editorContent) {
                tinymce.get('tinymceEditer').setContent(localStorage.editorContent)
              }
            })
            editor.on('keydown', function (e) {
              localStorage.editorContent = tinymce.get('tinymceEditer').getContent()
              this.editorValue = tinymce.get('tinymceEditer').getContent()
            })
          }
        })
      })
    },
    create () {
      this.cancel()
    },
    cancel () {
      localStorage.editorContent = ''
      tinymce.get('tinymceEditer').setContent('')
      this.$router.back(-1)
    }
  },
  created () {
    this.init()
  },
  destroyed () {
    tinymce.get('tinymceEditer').destroy()
  }
}
</script>

<style lang="less" scoped>
.dynamic {
  position: relative;
  .btn-wrap {
    padding: 15px;
    text-align: center;
    .ivu-btn {
      width: 100px;
    }
    .ivu-btn-default {
      margin-right: 20px;
    }
  }
}
</style>

<style lang="less">
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
</style>
