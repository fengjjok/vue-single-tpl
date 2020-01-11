/**
 * 此文件夹下的所有文件都由此统一暴露
 * */
import { tool } from './tool'
import _ from 'lodash'
import MD5 from 'md5'
import filters from './filter'
export default {
  _,
  MD5,
  tool,
  filters
}
