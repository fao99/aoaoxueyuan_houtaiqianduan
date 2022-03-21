<template>
  <div class="app-container">
    讲师列表
    <!--查询表单-->
    <!--:inline="true" 表示表单在一行显示  -->
    <!--v-model双向绑定  -->
    <!--v-model="teacherQuery.name" 不需要下面data里面加name 它会自动在teacherQuery里加name  -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名" />
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="teacherQuery.level"
          clearable
          placeholder="讲师头衔"
        >
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <!-- 因为头衔数据库里面是1和2 -->
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!-- 换一种方式跳转 使用router-link -->
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- 冒号就是v-bind -->
    <!-- @就是v-on 绑定一个事件 -->
    <!-- 这边最后@current-change="getList()"括号可加可不可加 而且不用穿page 已经帮我们封装好了 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>


<script>
//引入调用teacher.js文件
import teacher from "@/api/edu/teacher";

export default {
  //写核心代码位置
  //之前要写new vue但是这边不需要了 因为在main.js里面帮我们分装了
  // data:{

  // },
  //必须写出函数式
  data() {
    //定义数据变量和初始值
    return {
      list: null, //查询之后接口返回集合
      page: 1, //当前页
      limit: 10, //每页显示数
      total: 0, //总记录数
      teacherQuery: {}, //条件分装的对象
    };
  },
  created() {
    //页面渲染之前执行，一般调用methods定义的方法
    //调用
    this.getList();
  },
  methods: {
    //创建具体的方法，调用teacher.js定义的方法
    //讲师列表的方法
    //传入page做到分页
    getList(page = 1) {
      this.page = page;
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then((response) => {
          //response接口返回的数据
          //console.log(response)
          this.list = response.data.rows;
          this.total = response.data.total;
          console.log(this.list);
          console.log(this.total);
        }) //请求成功
        .catch((error) => {
          console.log(error);
        }); //请求失败
    },
    resetData() {
      //清空的方法
      //表单输入项数据清空
      this.teacherQuery = {};
      //查询所有讲师数据
      this.getList();
    },
    //删除讲师的方法
    removeDataById(id) {
      this.$confirm("此操作将永久删除讲师记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定，执行then方法
        //调用删除的方法
        teacher.deleteTeacherId(id).then((response) => {
          //删除成功
          //提示信息
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //回到列表页面
          this.getList();
        });
      }); //点击取消，执行catch方法 .catch可以不写 因为request.js也帮我们封装了
    },
  },
};
</script>