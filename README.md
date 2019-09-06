# Antd-component
antd提供的一些组件，有时候api不够，或者功能不太满足项目的需求，所以基于antd，封装了一些组件


RadioSelector
    options = [{ label: "label1", value: '2' }, { label: 'label2', value: '1' }];
    <RadioSelector options={options} />
    可结合表单

ChormeBar(未封装)
    根据github上某位大佬的chorme-bar，是原生js操作dom的，
    稍微改造成react版本，就是tabs，数组由自己存state中控制,每次更新的时候重新根据实际tabs初始化，
    如果不调用  this.chromeTab.init(this.el);   会发现tabs叠在一起
    componentDidUpdate 里面，重新刷新了一下tabs的情况，并根据数组里的active选项，手动改变激活
    图标用了svg，不需要的话，可以手动改

DateRangePicker
    日期范围选择器，antd里面有一个DatePicker，DatePicker里面有个RangePicker，足够完成需求了
    但是就是有些用户，不喜欢这种范围选择，所以写了一个组件，是由两个日期选择器组成的
    就是antd里面的自定义日期范围选择