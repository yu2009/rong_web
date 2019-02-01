<template>
  <div class="publish-article">
    <Content class="content-warp">
      <div class="content-panel">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="80"
        >
          <FormItem
            prop="title"
            label="标题:"
          >
            <Input
              v-model="formValidate.title"
              placeholder="请输入标题名称"
              :maxlength="25"
            /></Input>
          </FormItem>
          <FormItem
            prop="author"
            label="作者:"
          >
            <Input
              v-model="formValidate.author"
              placeholder="请输入作者名"
              :maxlength="15"
            /></Input>
          </FormItem>
          <FormItem label="描述:">
            <Input
              v-model="formValidate.describe"
              type="textarea"
              placeholder="描述"
              :maxlength="150"
            /></Input>
          </FormItem>
          <FormItem label="封面:">
            <Upload
              action="http://localhost:3000/test/upload/uploading"
              :show-upload-list="false"
              :format="['jpg','jpeg','png']"
              :max-size="1000024"
              :before-upload="handleBeforeUpload"
              :on-progress="handleProgress"
              :on-success="handleSuccess"
              :on-error="handleError"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              name="filename"
            >
              <div class="upload-cover-panel">
                <Button
                  v-show="showUploadBtn === 1"
                  icon="ios-cloud-upload-outline"
                >
                  上传封面
                </Button>
                <div
                  v-show="showUploadBtn === 2"
                  class="circle-wrap"
                >
                  <i-circle
                    :percent="percent"
                    :size="100"
                    :stroke-color="strokeColor"
                  >
                    <span
                      v-if="!uploadErrorState"
                      class="demo-circle-inner"
                    >
                      {{ percent }}%
                    </span>
                    <!--<Icon type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>-->
                    <Icon
                      v-else
                      type="ios-close"
                      size="50"
                      style="color:#ff5500"
                    />
                  </i-circle>
                </div>
                <img
                  v-show="showUploadBtn === 3"
                  class="article-cover"
                  :src="fileData.fileUrl"
                  alt=""
                >
              </div>
            </Upload>
          </FormItem>
          <FormItem label="内容:">
            <div>
              <editor />
            </div>
          </FormItem>
          <FormItem label="定时发送:">
            <DatePicker
              v-model="formValidate.date"
              type="date"
              :options="options3"
              transfer
              placeholder="选择日期"
            />
            <span style="margin: 0 15px;">
              ~
            </span>
            <TimePicker
              v-model="formValidate.time"
              type="time"
              format="HH:mm"
              transfer
              placeholder="选择时间"
            />
          </FormItem>
          <FormItem class="centent-submit">
            <Button
              type="primary"
              @click="handleSubmit('formValidate')"
            >
              提交
            </Button>
            <Button>保存</Button>
          </FormItem>
        </Form>
      </div>
    </Content>
  </div>
</template>

<script>
import {
    Content,
    Form,
    FormItem,
    Input,
    Button,
    DatePicker,
    TimePicker,
    Upload,
    Notice,
    Circle,
    Icon,
    Message
} from 'iview';
import editor from '@/components/tinymce-editor'

export default {
    name: "PublishArticle",
    components: {
        Content,
        Form,
        FormItem,
        Input,
        Button,
        DatePicker,
        TimePicker,
        Upload,
        Notice,
        'i-circle': Circle,
        Icon,
        Message,
        editor
    },
    data() {
        return {
            options3: {
                disabledDate(date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            showUploadBtn: 1,
            strokeColor: '#eaeef2',
            formValidate: {
                title: '',
                author: '',
                describe: "",
                date: '',
                titme: '',
                content: ''
            },
            ruleValidate: {
                title: [
                    {required: true, message: '标题不能为空', trigger: 'blur'}
                ],
                author: [
                    {required: true, message: '作者不能为空', trigger: 'blur'}
                ],
                content: [
                    {required: true, message: '内容不能为空', trigger: 'blur'}
                ]
            },
            fileData: {},
            percent: 0,
            uploadErrorState: false, // 上传失败的状态
        }
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {
        /*
        * 上传成功回调
        * */
        handleSuccess(res, file) {
            setTimeout(() => {
                this.showUploadBtn = 3;
                this.fileData = res;
                this.strokeColor = '#5cb85c';
            }, 1000)

        },
        /*
        * 上传失败
        * */
        handleError(error, file, fileList) {
            this.uploadErrorState = true;
            this.strokeColor = '#ff5500';
        },
        /*
        * 上传之前
        * */
        handleBeforeUpload() {
            this.percent = 0;
            this.uploadErrorState = false;
            this.strokeColor = '#2db7f5';
            this.showUploadBtn = 2;
        },
        /*
        * 上传中
        * */
        handleProgress(event, file, fileList) {
            this.percent = parseInt(event.percent);
        },
        /*
        * 上传格式错误
        * */
        handleFormatError(file) {
            Notice.warning({
                title: '文件格式不正确',
                desc: '文件格式不正确,请选择jpg或png'
            });
        },
        /*
        * 上传
        * */
        handleMaxSize(file) {
            Notice.warning({
                title: '超出文件大小限制',
                desc: '上传文件不能超过1M'
            });
        },
        /*
        * 文章提交
        * */
        handleSubmit(name) {
            var _this = this;
            _this.$refs[name].validate((valid) => {
                if (valid) {
                } else {
                    Message.error('提交失败,内容不完整!')
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.publish-article {
  padding: 24px;

  .content-warp {
    padding: 24px;
    min-height: 280px;
    background-color: #fff;

    .content-panel {
      width: 70%;
      margin: 0 auto;
    }
  }

  .form-label-left {
    text-align: right;
    font-size: 14px;
    padding-right: 10px;
  }

  .upload-cover-panel {
    width: 160px;
    height: 160px;
    line-height: 160px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #dcdee2;
    position: relative;

    .circle-wrap {
      position: absolute;
      top: 30px;
      left: 30px;
    }

    .article-cover {
      width: 100%;
      height: 100%;
    }
  }

  .centent-submit {
    text-align: center;
    border-top: 1px solid #dcdee2;
    padding: 24px 0;
    margin: 0;

    .ivu-btn {
      width: 120px;
      margin-right: 24px;
    }
  }
}
</style>
