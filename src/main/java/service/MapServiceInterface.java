package service;

import pojo.CatterVo;
import pojo.CitysVo;
import pojo.MapVo;

import java.util.List;

/**
 * Created by yaoye on 2018/8/23.
 */
public interface MapServiceInterface {
    List<MapVo> showChinaMap();

    List<MapVo> updateChinaChart2(int barNum);

    List<MapVo> updateChinaChart3(int barNum);

    List<MapVo> showProvinceMap(String provinceName);

    List<CitysVo> getCityInfo(int rowNum);

    List<CatterVo> getScatter(int maxScaNum, int minScaNum);

    List<CatterVo> getProvinceScatter(String province);
}
