document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded!');

    // 啟用 Bootstrap 5 的 Tooltip 和 Dropdown
    const tooltip = new bootstrap.Tooltip(document.body, {
        selector: '[data-bs-toggle="tooltip"]',
        trigger: 'hover'
    });

    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    const dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl);
    });

    // CSV 檔案相對於 HTML 文件的路徑
    const csvFilePath = 'official-website/car.csv';

    // 存儲解析後的 CSV 數據
    let carData = [];

    // 解析 CSV 文件
    Papa.parse(csvFilePath, {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
            carData = results.data;
            console.log('CSV 數據:', carData);
            // 初始化車型選項
            updateModelOptions();
        }
    });

    // 監聽廠牌選擇事件，更新車型選項
    $('#brand').change(function () {
        updateModelOptions();
    });

    // 定義更新車型選項的函式
    function updateModelOptions() {
        const selectedBrand = $('#brand').val();
        const modelSelect = $('#model');
        modelSelect.empty(); // 清空車型選項

        // 如果有選擇的品牌，則加載對應的車型選項
        if (selectedBrand) {
            const models = getModelsByBrand(selectedBrand);
            models.forEach(model => {
                modelSelect.append($('<option>', {
                    value: model,
                    text: model
                }));
            });
        }
    }

    // 根據品牌獲取對應的車型數據
    function getModelsByBrand(brand) {
        return carData.filter(car => car.Brand === brand).map(car => car.Model);
    }

    // 監聽導航標籤點擊事件
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            handleNavItemClick(item);
        });
    });


    // 顯示我要賣車的表單
    function showSellForm() {
        console.log('Showing Sell Form');
        hideLoginForm();
        hideAllForms();
        document.getElementById('onlineFormPage').style.display = 'block';
    }


    // 處理導航標籤點擊事件
    function handleNavItemClick(item) {
        console.log(`Clicked on ${item.textContent}`);

        switch (item.textContent.trim()) {
            case '我要賣車（填表單）':
                showOnlineForm();
                break;
            case '買車搜尋':
                showSearchForm();
                break;
            case '首頁':
                showHomePage();
                break;
            case '登入':
                showLoginForm();
                break;
            case '註冊':
                showRegisterForm();
                break;
            default:
                break;
        }
    }


    // 顯示線上填表單
    function showOnlineForm() {
        hideAllForms();
        document.getElementById('onlineFormPage').style.display = 'block';
    }

    // 顯示搜尋表單
    function showSearchForm() {
        hideAllForms();
        document.getElementById('searchForm').style.display = 'block';
    }

    // 顯示首頁（輪播和搜尋表單）
    function showHomePage() {
        hideAllForms();
        document.getElementById('searchForm').style.display = 'block';
        document.getElementById('carouselExample').style.display = 'block';
    }

    // 顯示登入表單
    function showLoginForm() {
        console.log('Showing Login Form');
        hideAllForms();
        document.getElementById('loginForm').style.display = 'block';
    }

    // 顯示註冊表單
    function showRegisterForm() {
        console.log('Showing Register Form');
        hideAllForms();
        document.getElementById('registerForm').style.display = 'block';
    }

    // 隱藏所有表單
    function hideAllForms() {
        const forms = ['onlineFormPage', 'searchForm', 'carouselExample', 'loginForm', 'registerForm'];
        forms.forEach(form => {
            document.getElementById(form).style.display = 'none';
        });
    }

    // 驗證帳號是否存在
    function checkAccountExists(username) {
        // 假設 accounts 是保存所有帳號的數據結構
        const accounts = ['user1', 'user2', 'user3'];
        return accounts.includes(username);
    }

    // 登入函數
    function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const accountExists = checkAccountExists(username);

        if (accountExists) {
            console.log('Login successful');
        } else {
            showLoginForm();
        }
    }


    


    // 驗證電話號碼格式
    function isValidPhone(phone) {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phone);
    }

    // 驗證年份格式
    function isValidYear(year) {
        const yearPattern = /^\d{4}$/;
        return yearPattern.test(year);
    }

    // 提交線上表單
    function submitOnlineForm() {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const brand = document.getElementById('brand').value.trim();
        const model = document.getElementById('model').value.trim();
        const year = document.getElementById('year').value.trim();
        const mileage = document.getElementById('mileage').value.trim();

        const formInputs = document.querySelectorAll('#sellForm input');
        let isFormValid = true;

        formInputs.forEach(input => {
            if (!input.value.trim()) {
                isFormValid = false;
            }
        });

        if (!isValidPhone(phone)) {
            alert('請輸入有效的電話號碼！');
            return;
        }

        if (!isValidYear(year)) {
            alert('請輸入正確的年份！');
            return;
        }

        if (isFormValid) {
            alert('線上表單已提交！');
        } else {
            alert('請填寫所有必填項目！');
        }
    }

    

});

