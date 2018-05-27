```
展示mysql一些默认值
```

### 查看当前mysql提供的存储引擎
```
show engines;
```

### 存储引擎默认设置
```
show variables like '%storage_engine%';
```

### 默认存储引擎
```
show variables like 'default_storage_engine';
```

### sql_mode
```
SQL_MODE的设置其实是比较冒险的一种设置,因为在这种设置下可以允许一些非法操作,比如可以将NULL插入NOT NULL的字段中,也可以插入一些非法日期,如“2012-12-32”.
因此在生产环境中强烈建议开发人员将这个值设为严格模式,这样有些问题可以在数据库的设计和开发阶段就能发现,而如果在生产环境下运行数据库后发现这类问题,那么修改的代价将变得十分巨大.
```

- 查看:select @@sql_mode
- 修改:
    - 1.配置文件修改 my.ini
    - 2.set @@sql_mode语句修改



