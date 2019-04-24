Rails.application.routes.draw do
  resources :employers
  resources :sessions

  resources :tax_years do
    resources :checks
    resources :employers
  end

  resources :users

  root 'welcome#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
