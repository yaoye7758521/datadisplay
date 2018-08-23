package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import pojo.MapVo;
import service.MapService;

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
}
