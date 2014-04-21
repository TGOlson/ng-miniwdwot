Miniwdwot::Application.routes.draw do

  resources :organizations, only: [:index, :show, :update, :destroy] do
    resources :groups, only: [:index]
  end


  resources :groups, only: [:show] do
    resources :maps, only: [:index]
  end

  resources :maps, only: [:show] do
    resources :properties, only: [:index, :update]
  end

  resources :properties, only: [:show]

  post   '/verify',            to: 'organizations#verify'
  post   '/property_inquiry',  to: 'organizations#property_inquiry'

  root to: 'high_voltage/pages#show', id: 'welcome'

end
