Makefile? :)

ogr2ogr -f geojson ne_50m_slim.geojson ne_50m_admin_0_countries.shp -select "sovereignt, name, pop_est, gdp_md_est, wikipedia, iso_a2, iso_a3, continent, subregion, tiny, homepart" -lco coordinate_precision=5

D.R.Y.!
http://bl.ocks.org/mapsense-examples/d86846a608108b345414
ogr2ogr flag_units.shp flag_units.geojson -dialect sqlite -sql "select geometry, sovereignt, name, pop_est, cast(round(pop_est/1000000) as integer) as pop_mill, cast(round(area_hec)/100 as integer) as area_sqkm, gdp_md_est, wikipedia, iso_a2, iso_a3, woe_id, continent, subregion, tiny, homepart from OGRGeoJSON" -lco coordinate_precision=5 -overwrite

ogr2ogr -f geojson flag_units_2.geojson flag_units.shp  -lco coordinate_precision=3

ogr2ogr ne_50_explode.shp ne_50m_admin_0_countries.shp -dialect sqlite -sql "select geometry, sovereignt, name, cast(pop_est as integer) as pop_est, cast(round(pop_est/1000000) as integer) as pop_mill, cast(round(st_area(st_transform(geometry,3975)))/1000000 as integer) as area_sqkm, cast(gdp_md_est as integer) as gdp_md_est, cast(wikipedia as text) as wikipedia, cast(woe_id as text) as woe_id, cast(tiny as text) as tiny, cast(homepart as text) as homepart, iso_a2, iso_a3, continent, subregion from ne_50m_admin_0_countries order by pop_mill desc" -lco coordinate_precision=5 -overwrite -explodecollections

ogr2ogr ne_50_over300sqkm.shp ne_50_explode.shp -where 'sqkm_part >= 300 and name <> "Antarctica"'

ogr2ogr ne_50_over300sqkm_union.shp ne_50_over300sqkm.shp -dialect sqlite -sql "select st_union(geometry) as geometry, sovereignt, name, pop_mill, area_sqkm, gdp_md_est, wikipedia, woe_id, tiny, homepart, iso_a2, iso_a3, continent, subregion from ne_50_over300sqkm GROUP BY sovereignt, name, pop_mill, area_sqkm, gdp_md_est, wikipedia, woe_id, tiny, homepart, iso_a2, iso_a3, continent, subregion"


ogr2ogr -f geojson ne50_aroundworld.geojson ne_50_over300sqkm_union.shp -lco coordinate_precision=5 -sql "select * from ne_50_over300sqkm_union order by pop_mill desc"

rm wilderness_calif2.geojson
ogr2ogr -f geojson wilderness_calif2.geojson  -dialect sqlite -sql "select st_union(geometry) as geometry, Name as name, Description as description from OGRGeoJSON group by name, description order by name" wilderness_calif_mapshaper.geojson -lco coordinate_precision=5

ogr2ogr -f geojson wilderness_ca_subset.geojson wilderness_calif2.geojson -where "name ilike 'yosemite%'"


ogrinfo -sql "alter table ne_50_explode add column sqkm_part integer" ne_50_explode.shp
ogrinfo -dialect sqlite -sql "update ne_50_explode set sqkm_part = cast(round(st_area(st_transform(geometry,3975)))/1000000 as integer)" ne_50_explode.shp

ogrinfo -sql "select name, sqkm_part, area_sqkm from ne_50_explode where sqkm_part < 150 order by sqkm_part" ne_50_explode.shp
545 of 1600 parts


Gameify:
Like http://websites.greeninfo.org/bay_institute/atlas/live/#8/-4.286/-77.618
With 2.8M geojson...

Pan/zoom to...
  1. Type name (or iso?)
  2. See poprank, arearank
  3. Score 22 of 35 correct (%)
  4. Countries (counties!) stay on map, so you can see progress / remaining.

"
    // polygons converted to lines
    //var line_sql = 'SELECT ST_CollectionExtract(the_geom,2) FROM ' + TABLENAME + ' as lines_table';
    //SELECT ST_Transform(ST_CollectionExtract(the_geom,2),3857) AS the_geom_webmercator, cartodb_id FROM cpad_units_m_nightly_simplify10m

    //ogr2ogr cpad_lines.shp cpad_units_m_nightly_simplify10m.shp -dialect sqlite -sql ""SELECT Boundary(geometry) as geometry, unit_name FROM cpad_units_m_nightly_simplify10m "" -overwrite

    //SELECT ST_Transform(Boundary(the_geom),3857) AS the_geom_webmercator, cartodb_id FROM cpad_units_m_nightly_simplify10m
    //SELECT ST_Transform(ExteriorRing(the_geom),3857) AS the_geom_webmercator, cartodb_id FROM cpad_units_m_nightly_simplify10m"

scalerank: Integer (0.0)
featurecla: String (0.0)
labelrank: Integer (0.0)
sovereignt: String (0.0)
sov_a3: String (0.0)
adm0_dif: Integer (0.0)
level: Integer (0.0)
type: String (0.0)
admin: String (0.0)
adm0_a3: String (0.0)
geou_dif: Integer (0.0)
geounit: String (0.0)
gu_a3: String (0.0)
su_dif: Integer (0.0)
subunit: String (0.0)
su_a3: String (0.0)
brk_diff: Integer (0.0)
name: String (0.0)
name_long: String (0.0)
brk_a3: String (0.0)
brk_name: String (0.0)
brk_group: String (0.0)
abbrev: String (0.0)
postal: String (0.0)
formal_en: String (0.0)
formal_fr: String (0.0)
note_adm0: String (0.0)
note_brk: String (0.0)
name_sort: String (0.0)
name_alt: String (0.0)
mapcolor7: Integer (0.0)
mapcolor8: Integer (0.0)
mapcolor9: Integer (0.0)
mapcolor13: Integer (0.0)
pop_est: Integer (0.0)
gdp_md_est: Real (0.0)
pop_year: Integer (0.0)
lastcensus: Integer (0.0)
gdp_year: Integer (0.0)
economy: String (0.0)
income_grp: String (0.0)
wikipedia: Integer (0.0)
fips_10: String (0.0)
iso_a2: String (0.0)
iso_a3: String (0.0)
iso_n3: String (0.0)
un_a3: String (0.0)
wb_a2: String (0.0)
wb_a3: String (0.0)
woe_id: Integer (0.0)
adm0_a3_is: String (0.0)
adm0_a3_us: String (0.0)
adm0_a3_un: Integer (0.0)
adm0_a3_wb: Integer (0.0)
continent: String (0.0)
region_un: String (0.0)
subregion: String (0.0)
region_wb: String (0.0)
name_len: Integer (0.0)
long_len: Integer (0.0)
abbrev_len: Integer (0.0)
tiny: Integer (0.0)
homepart: Integer (0.0)
area_jk: String (0.0)
area_hec: String (0.0)

curl -O http://www.wilderness.net/GIS/California_Wildernesses.kmz
ogr2ogr wilderness_calif.geojson -f geojson doc.kml

topojson  -p -o wilderness_calif.topojson -s 0.005 wilderness_calif.geojson



