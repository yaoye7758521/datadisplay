package mapper;

import pojo.CitysVo;
import pojo.MapVo;

import java.util.List;

/**
 * Created by yaoye on 2018/8/23.
 */

public interface MapMapper {
    List<MapVo> showChinaMap();

    List<MapVo> showProvinceMap(String provinceName);

    List<MapVo> updateChinaChart2(int barNum);

    List<String > getChinaCity(int rowNum);

    List<String> getForeignCity(int rowNum);

}
