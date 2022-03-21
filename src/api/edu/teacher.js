import request from '@/utils/request'
// 引入request 这边帮我们分装了axios

export default{
    //1讲师列表(条件查询分页)
    //current当前也 limit每页记录数 teacherQuery条件对象
    getTeacherListPage(current,limit,teaacherQuery){
        return request({
            //url: '/table/list/'+current+"/"+limit, 第一种方法
            url:`/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //teacherQuert条件对象 后端使用RequestBody获取数据 这边一定要用data
            //data表示把对象转换成json进行传递到接口里面
            data: teaacherQuery
        })
    },
    //删除讲师
    deleteTeacherId(id){
        return request({
            url:`/eduservice/teacher/${id}`,
            method: 'delete'
        })
    },
    //添加讲师
    addTeacher(teacher){
        return request({
            url:`/eduservice/teacher/addTeacher`,
            method: 'post',
            data: teacher
        })
    },
    //根据讲师id查询
    getTeacherInfo(id){
        return request({
            url:`/eduservice/teacher/getTeacher/${id}`,
            method: 'get',
        })
    },
    //修改讲师信息
    updateTeacherInfo(teacher){
        return request({
            url:`/eduservice/teacher/updateTeacher`,
            method: 'post',
            data: teacher
        })
    }




}

