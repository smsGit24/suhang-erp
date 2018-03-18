<template lang="html">
  <div class="default">
    <Layout :style="{minHeight: '100vh'}">
      <Sider ref="side" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu :active-name="$route.name" theme="dark" width="auto" :class="menuitemClasses" @on-select="pageRouter">
          <MenuItem v-for="(item, index) in routes" :key="index" :name="item.name">
            <Icon :type="item.meta.type"></Icon>
            {{item.meta.title}}
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)', padding: '0', display: 'flex'}">
          <Icon @click.native="collapsedSider" :class="rotateIcon" type="navicon-round" size="24"></Icon>
          <Breadcrumb :style="{flex: 1}">
            <BreadcrumbItem>苏商</BreadcrumbItem>
            <BreadcrumbItem v-for="(item, index) in breadcrumb" :to="breadcrumbPath(index)" :key="index">
              {{item.title}}
            </BreadcrumbItem>
          </Breadcrumb>
          <Dropdown trigger="click" placement="bottom-end" style="margin-right: 20px" @on-click="logout">
            <Avatar class="avatar" src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large" />
            <DropdownMenu slot="list">
              <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Header>
        <Content :style="{flex: 1, padding: '10px'}">
          <router-view style="background: #ffffff" class="page"/>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Cookies from 'js-cookie'
import { Layout, Sider, Header, Content, Breadcrumb, BreadcrumbItem, Card, Menu, MenuItem, Icon, MenuGroup, Submenu, Dropdown, DropdownMenu, DropdownItem, Avatar } from 'iview'
export default {
  components: { Layout, Sider, Header, Content, Breadcrumb, BreadcrumbItem, Card, Menu, MenuItem, Icon, MenuGroup, Submenu, Dropdown, DropdownMenu, DropdownItem, Avatar },
  data () {
    return {
      isCollapsed: false
    }
  },
  computed: {
    ...mapState({
      breadcrumb: state => state.breadcrumb
    }),
    menuitemClasses () {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    },
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    routes () {
      const routes = this.$router.options.routes.filter(({meta}) => meta.menu)
      routes.sort((a, b) => a.meta.menu - b.meta.menu)
      return routes
    }
  },
  methods: {
    pageRouter (active) {
      this.$router.push({
        name: active
      })
    },
    collapsedSider () {
      this.$refs.side.toggleCollapse()
    },
    logout (name) {
      switch (name) {
        case 'logout':
          Cookies.set('token', '')
          this.$router.push({name: 'Login'})
          break
        default:
          break
      }
    },
    breadcrumbPath (index) {
      if (index === this.breadcrumb.length - 1) {
        return this.$route.fullPath
      } else {
        return this.breadcrumb[index]['path']
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-con {
  height: 100%;
  width: 100%;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.menu-icon{
  width: 64px;
  padding: 22px 0 0 22px;
  transition: all .3s;
}
.rotate-icon{
  transform: rotate(-90deg);
}
</style>
<style lang="less">
.card {
  .ivu-card-body {
    height: 100%;
    .page {
      height: 100%;
    }
  }
}
</style>
