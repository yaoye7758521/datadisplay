package service;

import mapper.MapMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pojo.CitysVo;
import pojo.MapVo;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

/**
 * Created by yaoye on 2018/8/23.
 */

@Service
public class MapService implements MapServiceInterface {


    private String[] typeList = {"DDOS", "UDP", "SYN", "SQL注入", "木马", "ICMP", "XS注入", "SMURF", "LAND", "TEARDROP", "PING"};

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

    @Override
    public List<MapVo> updateChinaChart2(int barNum) {
        int max = 5000;
        int min = 0;
        List<MapVo> mapVos = mapMapper.updateChinaChart2(barNum);
        for (MapVo mapVo : mapVos) {
            mapVo.setValue(getRandomNum(max, min));
        }
        return mapVos;
    }

    @Override
    public List<MapVo> updateChinaChart3(int barNum) {
        int max = 100000;
        int min = 5000;
        List<MapVo> mapVos = new ArrayList<>();
        for (int i = 0; i < barNum; i++) {
            MapVo mapVo = new MapVo();
            mapVo.setName(typeList[i]);
            mapVo.setValue(getRandomNum(max, min));
            mapVos.add(mapVo);
        }
        return mapVos;
    }

    @Override
    public List<MapVo> showProvinceMap(String provinceName) {
        int max = 1000;
        int min = 0;
        List<MapVo> mapVos = mapMapper.showProvinceMap("%" + provinceName + "%");
        for (int i = 0; i < mapVos.size(); i++) {
            if (mapVos.get(i) == null) {
                mapVos.remove(i);
                continue;
            }
            mapVos.get(i).setValue(getRandomNum(max, min));
        }
        return mapVos;
    }

    @Override
    public List<CitysVo> getCityInfo(int rowNum) {
        ArrayList<CitysVo> citysVos = new ArrayList<>();
        List<String> chinaCity = mapMapper.getChinaCity(rowNum);
        List<String> foreignCity = mapMapper.getForeignCity(rowNum);
        for (int i = 0; i < rowNum; i++) {
            CitysVo citysVo = new CitysVo();
            citysVo.setDisAdd(chinaCity.get(i));
            citysVo.setSrcAdd(foreignCity.get(i));
            citysVo.setDate(getTime());
            citysVo.setType(typeList[getRandomNum(typeList.length - 1, 0)]);
            citysVo.setDisIP(getRandomNum(255, 0)
                    + "." + getRandomNum(255, 0)
                    + "." + getRandomNum(255, 0)
                    + "." + getRandomNum(255, 0));
            citysVo.setSrcIP(getRandomNum(255, 0)
                    + "." + getRandomNum(255, 0)
                    + "." + getRandomNum(255, 0)
                    + "." + getRandomNum(255, 0));
            citysVos.add(citysVo);
        }
        return citysVos;
    }

    private Integer getRandomNum(Integer max, Integer min) {
        return new Random().nextInt(max - min) + min;
    }

    private String getTime() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return df.format(new Date());
    }
}
