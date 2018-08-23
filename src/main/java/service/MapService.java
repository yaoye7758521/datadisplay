package service;

import mapper.MapMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pojo.MapVo;

import java.util.List;
import java.util.Random;

/**
 * Created by yaoye on 2018/8/23.
 */

@Service
public class MapService implements MapServiceInterface {
    @Autowired
    MapMapper mapMapper;

    @Override
    public List<MapVo> showChinaMap() {
        int max = 5000;
        int min = 0;
        List<MapVo> mapVos = mapMapper.showChinaMap();
        for (MapVo mapVo : mapVos) {
            mapVo.setValue(getRandomNum(max, min));
        }
        return mapVos;
    }

    Integer getRandomNum(Integer max, Integer min) {
        return new Random().nextInt(max - min) + min;
    }
}
