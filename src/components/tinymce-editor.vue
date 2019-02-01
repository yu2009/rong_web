<template>
  <div>
    <Editor
      :id="id"
      v-model="content"
      :init="defaultConfig"
    />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/table';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/spellchecker';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/save';
import 'tinymce/plugins/table';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/template';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/lists';

export default {
    name: "TinymceEditor",
    components: {
        Editor
    },
    props: {
        value: {
            default: '',
            type: String
        },
        config: {
            type: Object,
            default: () => {
                return {
                    theme: 'modern',
                    height: 300
                }
            }
        }
    },
    data() {
        const Id = Date.now();
        return {
            id: 'tinymce-' + Id,
            content: '请输入内容',
            editor: null,
            defaultConfig: {
                ...this.config,
                height: 300, // 高度
                theme: 'modern', // 主题
                skin_url: '/tinymce/skins/lightgray', // 皮肤
                upload_image_url: 'http://localhost:3000/test/upload', // 上传图片接口
                images_upload_handler: (blobInfo, success, failure) => {
                    if (blobInfo.blob().size > self.maxSize) {
                        failure('文件体积过大')
                    }

                    if (self.accept.indexOf(blobInfo.blob().type) >= 0) {
                        uploadPic()
                    } else {
                        failure('图片格式错误')
                    }

                    function uploadPic() {
                        const xhr = new XMLHttpRequest();
                        const formData = new FormData();
                        xhr.withCredentials = self.withCredentials;
                        xhr.open('POST', self.url);
                        xhr.onload = function () {

                            if (xhr.status !== 200) {
                                // 抛出 'on-upload-fail' 钩子
                                self.$emit('on-upload-fail');
                                failure('上传失败: ' + xhr.status);
                                return
                            }

                            const json = JSON.parse(xhr.responseText);
                            // 抛出 'on-upload-success' 钩子
                            self.$emit('on-upload-complete', [
                                json, success, failure
                            ])
                        }
                        formData.append('file', blobInfo.blob());
                        xhr.send(formData);
                    }
                }, // 图片上传
                images_upload_credentials: true, // 是否跨域
                menubar: false,
                content_style: `
    *                         { padding:0; margin:0; }
    html, body                { height:100%; }
    img                       { max-width:100%; display:block;height:auto; }
    a                         { text-decoration: none; }
    iframe                    { width: 100%; }
    p                         { line-height:1.6; margin: 0px; }
    table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
    .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
    ul,ol                     { list-style-position:inside; }
  `, //设置可编辑区域的样式
                // style_formats: [
                //     {
                //         title: '首行缩进',
                //         block: 'p',
                //         styles: {'text-indent': '2em'}
                //     },
                // ],
                // forced_root_block: 'p',
                // force_p_newlines: true,
                // importcss_append: true,
                plugins: [ // 插件
                    'autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
                    'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                    'save table contextmenu directionality emoticons template paste textcolor'
                ],
                toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',  // 工具栏按钮
                language: 'zh_CN', // 语言
                language_url: '/tinymce/langs/zh_CN.js', // 语言包路径
                paste_word_valid_elements: '*[*]', // word需要它
                paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
                paste_convert_word_fake_lists: false, // 插入word文档需要该属性
                elementpath: false, // 禁用底部的状态栏
            }
        }
    },
    mounted() {
        tinymce.init({});
    },
    beforeDestroy() {
    },
    methods: {}
}
</script>

<style lang="less">
.mce-notification {
  display: none !important;
}
</style>
