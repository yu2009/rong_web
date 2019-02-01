<style scoped lang="less">
.wrapper {
  height: 100%;

  .header-wrap {
    height: 64px;
    line-height: 64px;
    padding: 0 20px;
    background: #fff;
    /*box-shadow: 0 2px 3px 2px rgba(0, 0, 0, .1);*/
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .layout-logo {
      display: inline-block;
      width: 100px;
      height: 40px;
      margin: 12px 0;
      background: url("../../../assets/images/logoT_03.png") no-repeat center /100%;
    }

    .wrapper-header-nav {
      height: 63px;
      float: right;
      overflow: hidden;

      .header-item {
        display: inline-block;
        height: 100%;
        cursor: pointer;
        transition: all .3s;
        padding: 0 12px;

        &:hover {
          background-color: #f9f9f9;
        }
      }

      .header-search {
        .search-btn {
          display: inline-block;
          text-rendering: optimizeLegibility;
          vertical-align: middle;
        }
      }

      .header-notice {
        .ivu-badge {
          line-height: 1;
        }

        .ivu-poptip-body {
          padding: 0;
        }
      }
    }
  }

  .sider-wrapper {
    background-color: #fff;
    position: fixed;
    height: 100%;
    left: 0;
    overflow: auto;

    .ivu-menu {
      height: 100%;
    }
  }

  .content-layout {
    margin-left: 200px;
  }

  .breadcrumb-nav {
    background-color: #fff;
    height: 140px;
    padding: 24px;

    .ivu-breadcrumb {
      margin-bottom: 10px;
    }

    h2 {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, .85);
    }
  }
}
</style>
<style lang="less">
.header-wrap {
  .search-select {
    transition: width .3s, margin-left .3s;
    width: 0;
    border-bottom: 1px solid #dcdee2;
    overflow: hidden;

    .ivu-select-selection {
      border: none;
      background-color: transparent;
      box-shadow: none;
    }
  }

  .active-search-select {
    width: 210px;
    margin-left: 10px;
  }

  .header-notice {
    .ivu-poptip-body {
      padding: 0;
    }

    .ivu-tabs-bar {
      margin: 0;

      .ivu-tabs-nav-container {
        padding: 0 10px;
      }

      .ivu-tabs-nav {
        .ivu-tabs-tab {
          padding: 10px;
        }
      }
    }

    .ivu-cell-group {
      .ivu-cell {
        padding: 12px 24px;
        border-bottom: 1px solid #e8e8e8;

        .ivu-cell-item {
          height: 48px;
        }

        .ivu-cell-title {
          margin-bottom: 10px;
        }

        .ivu-cell-icon {
          width: 32px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          background-color: #ed4014;
          border-radius: 50%;
          margin-right: 16px;
        }
      }
    }

    .ignore-notice {
      text-align: center;
      height: 46px;
      line-height: 46px;
    }
  }

  .header-user {
    .user-name {
      margin-left: 5px;
    }

    .ivu-select-dropdown {
      right: 20px;
    }
  }
}

.ivu-layout {
  height: 100%;
}

.ivu-layout-footer {
  text-align: center;
}
</style>
<template>
  <div class="wrapper">
    <Layout>
      <Header class="header-wrap">
        <div class="layout-logo" />
        <div class="wrapper-header-nav">
          <div class="header-item header-search">
            <span
              class="search-btn"
              @click.stop="showSearchFrame = !showSearchFrame"
            >
              <Icon
                size="24"
                type="ios-search-outline"
              />
            </span>
            <Select
              v-model="model11"
              v-click-outside="openSearch"
              class="search-select"
              :class="{'active-search-select': showSearchFrame}"
              filterable
              remote
              :remote-method="remoteMethod"
              :loading="search_loading"
              placeholder="站内搜索"
            >
              <Option
                v-for="(item,index) in options1"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </Option>
            </Select>
          </div>
          <div class="header-item header-notice">
            <Poptip
              placement="bottom-end"
              width="360"
            >
              <Badge dot>
                <Icon
                  size="24"
                  type="ios-notifications-outline"
                />
              </Badge>
              <div
                slot="content"
                class="notice-content"
              >
                <Tabs value="name1">
                  <TabPane
                    label="通知(4)"
                    name="name1"
                  >
                    <CellGroup>
                      <Cell>
                        <span>你推荐的白白白通过了第三次面试</span>
                        <span slot="icon">
                          <Icon
                            type="ios-mail"
                            size="16"
                            color="#fff"
                          />
                        </span>
                        <span slot="label">
                          1年前
                        </span>
                      </Cell>
                      <Cell>
                        <span>你推荐的白白白通过了第三次面试</span>
                        <span slot="icon">
                          <Icon
                            type="ios-mail"
                            size="16"
                            color="#fff"
                          />
                        </span>
                        <span slot="label">
                          1年前
                        </span>
                      </Cell>
                    </CellGroup>
                    <div class="ignore-notice">
                      忽略 通知
                    </div>
                  </TabPane>
                  <TabPane
                    label="消息(3)"
                    name="name2"
                  >
                    标签二的内容
                  </TabPane>
                  <TabPane
                    label="代办(7)"
                    name="name3"
                  >
                    标签三的内容
                  </TabPane>
                </Tabs>
              </div>
            </Poptip>
          </div>
          <div class="header-item header-user">
            <Dropdown
              placement="bottom-end"
              @on-click="handleClick"
            >
              <Avatar icon="ios-person" />
              <a
                class="user-name"
                href="javascript:void(0)"
              >
                夏流
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="userCenter">
                  <Icon
                    size="18"
                    type="md-person"
                  />
                  个人中心
                </DropdownItem>
                <DropdownItem name="userSettings">
                  <Icon
                    size="18"
                    type="ios-settings"
                  />
                  个人设置
                </DropdownItem>
                <DropdownItem
                  divided
                  name="logout"
                >
                  <Icon
                    size="18"
                    type="md-log-out"
                  />
                  退出登录
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          hide-trigger
          class="sider-wrapper"
        >
          <Menu
            active-name="1-2"
            width="auto"
            :open-names="['1']"
          >
            <MenuItem name="1-1">
              <Icon type="md-document" />
              统计页
            </MenuItem>
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate" />
                文章页
              </template>
              <MenuItem name="1-1">
                文章列表
              </MenuItem>
              <MenuItem
                name="1-2"
                to="/publish-article"
              >
                发布文章
              </MenuItem>
              <MenuItem name="1-3">
                Option 3
              </MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad" />
                Item 2
              </template>
              <MenuItem name="2-1">
                Option 1
              </MenuItem>
              <MenuItem name="2-2">
                Option 2
              </MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics" />
                个人页
              </template>
              <MenuItem name="3-1">
                个人中心
              </MenuItem>
              <MenuItem name="3-2">
                个人设置
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout class="content-layout">
          <div class="breadcrumb-nav">
            <Breadcrumb>
              <BreadcrumbItem to="/">
                首页
              </BreadcrumbItem>
              <BreadcrumbItem>文章页</BreadcrumbItem>
              <BreadcrumbItem>发布文章</BreadcrumbItem>
            </Breadcrumb>
            <h2><span>发布文章</span></h2>
            <p><span>发布文章到互联网</span>!</p>
          </div>
          <router-view />
          <Footer class="layout-footer-center">
            2019 &copy; Rong
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import {
    Layout,
    Menu,
    MenuItem,
    Sider,
    Submenu,
    Icon,
    Avatar,
    Badge,
    Select,
    Option,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Poptip,
    Tabs,
    TabPane,
    CellGroup,
    Cell,
    Breadcrumb,
    BreadcrumbItem,
    Footer
} from 'iview';
import {mapActions} from 'vuex'

export default {
    name: '',
    components: {
        Layout,
        Menu,
        MenuItem,
        Sider,
        Submenu,
        Icon,
        Avatar,
        Badge,
        Select,
        Option,
        Dropdown,
        DropdownMenu,
        DropdownItem,
        Poptip,
        Tabs,
        TabPane,
        CellGroup,
        Cell,
        Breadcrumb,
        BreadcrumbItem,
        Footer
    },
    directives: {
        clickOutside: {
            bind(el, binding, vnode) {
                document.addEventListener('click', (e) => {
                    if (el.contains(e.target)) {
                        return false;
                    }
                    if (binding.expression) {
                        binding.value(e);
                    }
                })
            },
            inserted() {
                console.log('绑定到节点')
            },
            update() {
                console.log('组件更新')
            },
            componentUpdated() {
                console.log('组件更新完成')
            },
            unbind(el, binding) {
                console.log(el, '解绑')
            }
        }
    },
    data() {
        return {
            list: [
                'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'
            ],
            model11: '',
            options1: [],
            search_loading: false,
            showSearchFrame: false
        }
    },
    methods: {
        ...mapActions([
            'handleLogout'
        ]),
        openSearch() {
            this.showSearchFrame = false
        },
        remoteMethod(query) {
            if (query !== '') {
                this.search_loading = true;
                setTimeout(() => {
                    this.search_loading = false;
                    const list = this.list.map(item => {
                        return {
                            value: item,
                            label: item
                        };
                    });
                    this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                }, 500);
            } else {
                this.options1 = [];
            }
        },
        /*
        * 退出登录
        * */
        logout() {
            this.handleLogout().then(() => {
                this.$router.push({
                    name: 'login'
                })
            })
        },
        handleClick(name) {
            switch (name) {
            case 'logout':
                this.logout();
                break;
            case 'userCenter':
                this.$router.push({});
                break;
            case 'userSettings':
                this.$router.push({});
                break;
            }
        }
    }
};
</script>
<!--
*author::^_夏流_^
*describe:
*2018/12/27 16:35
-->
