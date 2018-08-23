package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import pojo.CitysVo;
import pojo.MapVo;
import service.MapService;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

/**
 * Created by yaoye on 2018/8/23.
 */

@Controller
@RequestMapping("map")
public class MapController {

    @Autowired
    MapService mapService;

    @RequestMapping("china")
    @ResponseBody
    public List<MapVo> getChinaArea() {
        return mapService.showChinaMap();
    }

    @RequestMapping("province")
    @ResponseBody
    public List<MapVo> getProvinceArea(String area) throws UnsupportedEncodingException {
        String username = URLDecoder.decode(area, "UTF-8");
        return mapService.showProvinceMap(username);
    }

    @RequestMapping("chart2")
    @ResponseBody
    public List<MapVo> updateChinaChart2(int barNum){
        return mapService.updateChinaChart2(barNum);
    }

    @RequestMapping("chart3")
    @ResponseBody
    public List<MapVo> updateChinaChart3(int barNum){
        return mapService.updateChinaChart3(barNum);
    }


    @RequestMapping("city")
    @ResponseBody
    public List<CitysVo> getCityList(int rowNum) {
        return mapService.getCityInfo(rowNum);
    }
}
