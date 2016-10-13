import xFetch from './xFetch';
 import React, { PropTypes } from 'react'
import { Table, Icon,Button } from 'antd';
import { DateFormat } from '../utils';
import {  Link } from 'react-router';

/**
 * 搜索任务
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
export async function searchTasks(pageIndex, pageSize,keywords,field) {
    return xFetch('Task/Task/getTaskList?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&keywords=' + keywords+'&field=' +field);

    //return xFetch('/api/searchUsers')
}

/**
 * 查询待审核的任务列表
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
export async function queryTaskListForAud(pageIndex,pageSize){

    return xFetch(`Task/Task/getTaskListForAud?pageIndex=${pageIndex}&pageSize=${pageSize}`)
}

/**
 * 关闭或打开任务
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
export async function switchTask({taskid,isclose,ccustid}) {

    let isc = 1;
    if (!isclose){
        isc = 0
    }

    return xFetch(`Task/Task/switchTask?taskid=${taskid}&isclosed=${isc}&custid=${ccustid}`)
}

/**
 * 查询任务统计信息
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
export async function queryTaskListForCount({pageIndex,pageSize}) {

    return xFetch(`Task/Task/getTaskListForCount?pageIndex=${pageIndex}&pageSize=${pageSize}`)
}

/**
 * 查询凭证
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
export async function queryViewVoucher({taskid,orderid}){

    return xFetch(`Task/Task/viewVoucher?taskid=${taskid}&orderid=${orderid}`)
}

/**
 * 查询任务详情
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
export async function queryTaskDetail(taskid,pageIndex,pageSize,keywords,field,auditingstatus){
    if (auditingstatus||auditingstatus===0) {
        return xFetch(`Task/Task/getTaskOrderList?taskid=${taskid}&pageIndex=${pageIndex}&pageSize=${pageSize}&keywords=${keywords}&field=${field}&auditingstatus=${auditingstatus}`)
    }else{
        return xFetch(`Task/Task/getTaskOrderList?taskid=${taskid}&pageIndex=${pageIndex}&pageSize=${pageSize}&keywords=${keywords}&field=${field}`)
    }

    
}

/**
 * 查询任务类型
 * @return {[type]}
 */
export async function queryTaskTypes() {
    return xFetch('Task/Task/taskType');
}

export async function queryTaskTpls() {
    return xFetch('Task/Task/getTplList');
}

/**
 * 审核任务订单
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
export async function auditingTaskOrder({taskid,orderid,auditingstatus,memo}) {
    return xFetch(`Task/Task/auditingTaskOrder?taskid=${taskid}&orderid=${orderid}&status=1&auditingstatus=${auditingstatus}&memo=${memo}`);
}

export async function addTask(task){

    var startTime = DateFormat('yyyy-MM-dd hh:mm',task.taskTime[0])
    var endTime = DateFormat('yyyy-MM-dd hh:mm',task.taskTime[1])
    var tpsStr = JSON.stringify(task.tplItems)
    console.log('---' + tpsStr)

    return xFetch(`Task/Task/addTask?templateids=${tpsStr}&voucherrequire=${task.voucherrequire}&taskrequire=${task.taskDesc}&taskname=${task.taskname}&type=${task.type}&undertakerequire=${task.undertakerequire}&settlementrule=${task.settlementrule}&custid=${task.mvalue}&totalnum=${task.totalnum}&executornum=1&starttime=${startTime}&endtime=${endTime}`);
}

export  function taskDetailColumns() {
    return [{
        title: 'ID',
        dataIndex: 'orderid',
        key: 'orderid'
    },{
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname'
    },{
        title: '学校',
        dataIndex: 'university',
        key: 'university'
    },{
        title: '承接时间',
        dataIndex: 'undertaketime',
        key: 'undertaketime'
    },{
        title: '完成时间',
        dataIndex: 'completetime',
        key: 'completetime'
    },{
        title: '凭证详情',
        dataIndex: 'operate',
        key: 'operate',
        render: (text,record) => <Link to={{pathname:'voucher',query:{orderid:record.orderid,taskid:record.taskid}}}>详情</Link>,
    }, {
        title: '审核状态',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
            if (text=='0') {
                return '待审核'
            }
            if (text=='1') {
                return <span style={{color:'#0000FF'}}>通过</span>
            }
            if (text=='2') {
                return '拒绝'
            }
            
        }
    }, {
        title: '审核时间',
        dataIndex: 'auditingtime',
        key: 'auditingtime',
    }, {
        title: '审核人',
        dataIndex: 'auditingcust',
        key: 'auditingcust',
    }]
}

